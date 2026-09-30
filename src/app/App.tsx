import { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { weddingData } from "../data/weddingData";
import { guestList, type GuestRecord } from "../data/guestList";
import { HeroSection } from "../components/invitation/HeroSection";
import { CountdownSection } from "../components/invitation/CountdownSection";
import { EventsSection } from "../components/invitation/EventsSection";
import { GallerySection } from "../components/invitation/GallerySection";
import { InfoSection } from "../components/invitation/InfoSection";
import { GiftSection } from "../components/invitation/GiftSection";
import { InstagramSection } from "../components/invitation/InstagramSection";
import { FooterSection } from "../components/invitation/FooterSection";
import { AudioControl } from "../components/ui/AudioControl";
import { RsvpSection } from "../components/invitation/RsvpSection";
import "../../src/App.css";

const GUEST_SESSION_KEY = "marceyluis_guest";
const COUNTRY_CODE = "57";
const PHONE_PREFIX = "+57 ";

const texts = {
  access: {
    emptyPhone: "Ingresa tu número de teléfono.",
    invalidGuest: "No encontramos una invitación asociada a este número.",
    changeGuest: "Cambiar invitado",
    invitedFor: "Invitación para",
  },
  audio: {
    play: "Activar música",
    pause: "Pausar música",
  },
  hero: {
    quote: weddingData.quote,
    quoteAuthor: weddingData.quoteAuthor,
    dateText: weddingData.dateText,
  },
  footer: {
    dateText: weddingData.dateText,
  },
  countdown: {
    title: "Faltan",
    days: "días",
    hours: "horas",
    minutes: "minutos",
    seconds: "segundos",
  },
  rsvp: {
    title: "Confirmación de asistencia",
    subtitle: "Por favor confirma tu asistencia.",
    confirmButton: "Confirmar asistencia",
    attendingLabel: "Sí asistiré",
    notAttendingLabel: "No podré asistir",
    guestsLabel: "Número de asistentes",
    messageLabel: "Mensaje",
    submitLabel: "Enviar confirmación",
    successMessage: "Gracias por confirmar tu asistencia.",
  },
};

function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

/**
 * Normaliza cualquier número para comparar contra guestList.
 *
 * Convierte:
 * - 3204344662
 * - +57 3204344662
 * - 57 3204344662
 *
 * En:
 * - últimos 10 dígitos reales
 */
function normalizePhoneForMatch(value: string) {
  let digits = onlyDigits(value);

  if (!digits) return "";

  if (digits.startsWith(COUNTRY_CODE) && digits.length > 10) {
    digits = digits.slice(COUNTRY_CODE.length);
  }

  if (digits.length > 10) {
    digits = digits.slice(-10);
  }

  return digits.trim();
}

/**
 * Limpia el número que el usuario escribe para evitar duplicar indicativos.
 *
 * Ejemplo del bug corregido:
 * Antes:
 * +57 5 -> +57 575 -> +57 5757
 *
 * Ahora:
 * +57 5 -> +57 5
 * +57 57 -> +57 57
 * +57 575 -> +57 575
 */
function extractNationalPhoneFromInput(value: string) {
  let digits = onlyDigits(value);

  if (!digits) return "";

  // Si el valor ya viene con el indicativo actual porque el input está controlado,
  // lo retiramos siempre para no duplicarlo.
  if (digits.startsWith(COUNTRY_CODE)) {
    digits = digits.slice(COUNTRY_CODE.length);
  }

  if (digits.length > 10) {
    digits = digits.slice(-10);
  }

  return digits;
}

function formatPhoneInput(value: string) {
  const nationalNumber = extractNationalPhoneFromInput(value);

  if (!nationalNumber) return "";

  return `${PHONE_PREFIX}${nationalNumber}`;
}

export default function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [accessError, setAccessError] = useState("");
  const [guestSession, setGuestSession] = useState<GuestRecord | null>(null);

  useEffect(() => {
    const savedGuest = sessionStorage.getItem(GUEST_SESSION_KEY);
    if (!savedGuest) return;

    try {
      const parsed = JSON.parse(savedGuest) as GuestRecord;

      if (parsed?.name && parsed?.phone) {
        setGuestSession(parsed);
      }
    } catch {
      sessionStorage.removeItem(GUEST_SESSION_KEY);
    }
  }, []);

  const canViewFullInvitation = !!guestSession;
  const guestName = guestSession?.name ?? "";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const playAudio = () => {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => console.log("Autoplay bloqueado"));
    };

    playAudio();

    const handleFirstInteraction = () => {
      playAudio();
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  const handleToggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleGuestAccess = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedPhone = normalizePhoneForMatch(phoneInput);

    if (!normalizedPhone) {
      setAccessError(texts.access.emptyPhone);
      return;
    }

    const guestFound = guestList.find((guest) => {
      const normalizedGuestPhone = normalizePhoneForMatch(guest.phone);
      return normalizedGuestPhone === normalizedPhone;
    });

    if (!guestFound) {
      setAccessError(texts.access.invalidGuest);
      return;
    }

    sessionStorage.setItem(GUEST_SESSION_KEY, JSON.stringify(guestFound));
    setGuestSession(guestFound);
    setAccessError("");
  };

  const handleLogoutGuest = () => {
    sessionStorage.removeItem(GUEST_SESSION_KEY);
    setGuestSession(null);
    setPhoneInput("");
    setAccessError("");
  };

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <audio ref={audioRef} loop>
        <source src="/music/you-could-be-happy.mp3" type="audio/mpeg" />
      </audio>

      <HeroSection
        heroImage={weddingData.heroImage}
        couple={weddingData.couple}
        dateText={texts.hero.dateText}
        quote={texts.hero.quote}
        quoteAuthor={texts.hero.quoteAuthor}
        isRootAccess={!canViewFullInvitation}
        guestName={guestName}
        phoneInput={phoneInput}
        accessError={accessError}
        texts={{
          topLabel: " ",
          invitationLine: "Te invitan a ser parte de la celebración de su matrimonio",
          rootTitle: "Eres parte de los nuestros",
          rootSubtitle: "Gracias por estar aquí hoy.",
          phonePlaceholder: "🇨🇴 +57 Número de teléfono",
          submitLabel: "Ver mi invitación",
          imageAlt: "Wedding couple",
          reservedMessageTitle: "Esta invitación es para ti",
          reservedMessageBody:
            "Con mucho cariño, esta invitación ha sido pensada especialmente para ti, porque haces parte de este momento único. Es personal y válida únicamente para las personas aquí mencionadas.",
          reservedMessageNote: " ",
        }}
        onPhoneChange={(value: string) => {
          const formattedPhone = formatPhoneInput(value);
          setPhoneInput(formattedPhone);

          if (accessError) {
            setAccessError("");
          }
        }}
        onAccessSubmit={handleGuestAccess}
      />

      {canViewFullInvitation && (
        <>
          <CountdownSection
            targetDate={weddingData.weddingDate}
            texts={texts.countdown}
          />

          <EventsSection />

          <GiftSection />

          <InfoSection />

          <GallerySection images={weddingData.galleryImages} />

          <InstagramSection />

          <RsvpSection
            guestName={guestSession?.name ?? ""}
            guestPhone={guestSession?.phone ?? ""}
          />

          <FooterSection couple={weddingData.couple} dateText={texts.footer.dateText} />

          <div className="flex justify-center pb-8">
            <button className="guest-exit-button" onClick={handleLogoutGuest}>
              {texts.access.changeGuest}
            </button>
          </div>
        </>
      )}

      <div className="floating-controls">
        <AudioControl
          isPlaying={isPlaying}
          onToggle={handleToggleAudio}
          playLabel={texts.audio.play}
          pauseLabel={texts.audio.pause}
        />
      </div>
    </div>
  );
}
