import type { SVGProps } from "react";

export function BurgerIllustration({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={
        className ??
        "h-auto w-full max-w-107.5 drop-shadow-[0_28px_25px_rgba(20,20,20,0.18)]"
      }
      viewBox="0 0 520 430"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M119 190C127 110 185 69 260 69C335 69 393 110 401 190H119Z"
        fill="#FFD40D"
        stroke="#151515"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <path
        d="M156 150C193 113 247 99 304 111"
        stroke="#FFF4B8"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <g fill="#F5F8FD">
        <ellipse
          cx="205"
          cy="107"
          rx="7"
          ry="4"
          transform="rotate(-24 205 107)"
        />
        <ellipse cx="262" cy="94" rx="7" ry="4" transform="rotate(8 262 94)" />
        <ellipse
          cx="321"
          cy="113"
          rx="7"
          ry="4"
          transform="rotate(26 321 113)"
        />
        <ellipse
          cx="354"
          cy="145"
          rx="7"
          ry="4"
          transform="rotate(40 354 145)"
        />
        <ellipse
          cx="160"
          cy="151"
          rx="7"
          ry="4"
          transform="rotate(-40 160 151)"
        />
      </g>
      <rect
        x="103"
        y="188"
        width="314"
        height="38"
        rx="18"
        fill="#F3274C"
        stroke="#151515"
        strokeWidth="10"
      />
      <path
        d="M121 240C158 220 190 264 227 240C264 216 296 264 333 240C365 219 390 239 406 255L389 288H126L108 255C111 250 116 245 121 240Z"
        fill="#6DBF54"
        stroke="#151515"
        strokeWidth="10"
        strokeLinejoin="round"
      />
      <rect
        x="112"
        y="271"
        width="296"
        height="61"
        rx="27"
        fill="#5E2B1F"
        stroke="#151515"
        strokeWidth="10"
      />
      <path
        d="M142 333H378C390 333 400 343 400 355V361H120V355C120 343 130 333 142 333Z"
        fill="#FFD40D"
        stroke="#151515"
        strokeWidth="10"
      />
      <path
        d="M169 277L224 328L283 277L338 328"
        stroke="#F7A63B"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <circle cx="207" cy="174" r="7" fill="#151515" />
      <circle cx="313" cy="174" r="7" fill="#151515" />
      <path
        d="M240 178C251 190 269 190 280 178"
        stroke="#151515"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M109 381C174 398 346 398 411 381"
        stroke="#151515"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M83 138L59 123M437 138L461 123M82 285L52 294M438 285L468 294"
        stroke="#F3274C"
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  );
}
