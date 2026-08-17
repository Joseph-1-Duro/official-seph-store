"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroImages = [
  { src: "/images/hero-1.jpg", alt: "" },
  { src: "/images/hero-2.jpg", alt: "" },
  { src: "/images/hero-3.jpg", alt: "" },
  { src: "/images/hero-4.jpg", alt: "" },
  { src: "/images/hero-5.jpg", alt: "" },
];

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".floating-images__card",
        hero
      );

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".hero__content", { autoAlpha: 1, clearProps: "all" });
        gsap.set(cards, { autoAlpha: 1, scale: 1, clearProps: "all" });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Intro: fade the hero content in first, then the cards.
        const intro = gsap.timeline({ defaults: { ease: "power2.out" } });
        intro
          .fromTo(
            ".hero__content",
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.9 }
          )
          .fromTo(
            cards,
            { autoAlpha: 0, scale: 0.9 },
            { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.15 },
            "-=0.25"
          );

        // Gentle floating loop for the side cards. The top-center card is
        // left out so the scroll animation can move it straight up without
        // a property clash.
        cards.slice(0, 4).forEach((card) => {
          gsap.to(card, {
            y: `+=${randomBetween(12, 24)}`,
            rotation: randomBetween(-3, 3),
            duration: randomBetween(2.5, 4),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        // On scroll: left cards drift left, right cards drift right, and the
        // top-center card rises — like a curtain parting.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          })
          .to(cards[0], { x: -220 }, 0)
          .to(cards[2], { x: -220 }, 0)
          .to(cards[1], { x: 220 }, 0)
          .to(cards[3], { x: 220 }, 0)
          .to(cards[4], { x: 0, y: -160, scale: 1.08 }, 0);
      });
    },
    { scope: heroRef }
  );

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__content">
        <h1>Elevate your style</h1>
        <p>Get you looks right at one store.</p>
        <Link href={"/shop"} className="btn-container">
          <div className="btn-drawer transition-top">Welcome...</div>
          <div className="btn-drawer transition-bottom">...8 hours</div>

          <button className="btn">
            <span className="btn-text">Shop Now</span>
          </button>

          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
          <svg
            className="btn-corner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-1 1 32 32"
          >
            <path
              d="M32,32C14.355,32,0,17.645,0,0h.985c0,17.102,13.913,31.015,31.015,31.015v.985Z"
            ></path>
          </svg>
        </Link>
      </div>

      <div className="floating-images" aria-hidden="true">
        {heroImages.map((img) => (
          <div className="floating-images__card" key={img.src}>
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 575px) 110px, (max-width: 767px) 130px, (max-width: 1023px) 170px, 240px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}