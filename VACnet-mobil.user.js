// ==UserScript==
// @name         VACnet Mobile
// @namespace    https://www.counter-strike.net/vacnet
// @version      2.5.1
// @description  Layout responsivo para VACnet: header compacto, video sticky, controles optimizados para 360x800, instrucciones colapsables (React-safe), veredictos compactos, notificaciones inmediatas.
// @author       DiegoKu
// @match        https://www.counter-strike.net/vacnet*
// @match        https://counter-strike.net/vacnet*
// @run-at       document-start
// @grant         none
// ==/UserScript==

(() => {
  "use strict";

  const STYLE_ID = "vacnet-mobile-perfect-layout";
  const ROOT_CLASS = "vacnet-mobile-ready";
  const MOBILE_MQ = "(max-width: 900px)";
  const SMALL_MQ  = "(max-width: 400px)"; // 360x800 entra aquí

  const CSS = `
    html.${ROOT_CLASS} {
      -webkit-text-size-adjust: 100%;
      text-size-adjust: 100%;
      --vacnet-header-h: 52px;
      --vacnet-footer-h: 70px;
      --vacnet-submit-h: 70px;
      --vacnet-bottom-h: 140px;
    }

    @media ${MOBILE_MQ} {
      html.${ROOT_CLASS} {
        width: 100% !important;
        max-width: 100% !important;
        overflow-x: hidden !important;
        overflow-y: scroll !important;
        height: auto !important;
        background: #0a0a0b !important;
        -webkit-overflow-scrolling: touch !important;
      }

      html.${ROOT_CLASS} body {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        overflow-x: hidden !important;
        padding: calc(var(--vacnet-header-h, 52px) + 6px) 0 calc(var(--vacnet-bottom-h, 140px) + 10px) 0 !important;
        overflow-y: visible !important;
        height: auto !important;
        min-height: 100% !important;
        background: #0a0a0b !important;
        box-sizing: border-box !important;
      }

      html.${ROOT_CLASS} .page-container {
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        overflow: visible !important;
      }

      /* === 1. PageHeader (Altura original restaurada y botón Invite optimizado) === */
      html.${ROOT_CLASS} .PageHeader {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 56px !important;
        min-height: 56px !important;
        max-height: 56px !important;
        z-index: 1002 !important;
        background: #0a0a0b !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        box-sizing: border-box !important;
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        justify-content: space-between !important;
        align-items: center !important;
        padding: 6px 12px !important;
        margin: 0 !important;
      }

      /* Logo CS alineado y centrado */
      html.${ROOT_CLASS} .PageHeader .CSLogo {
        height: 30px !important;
        width: auto !important;
        max-width: 80px !important;
        margin: 0 !important;
        object-fit: contain !important;
        align-self: center !important;
      }

      /* Contenedor derecho alineado al centro */
      html.${ROOT_CLASS} .PageHeader .right {
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 10px !important;
        margin: 0 !important;
        padding: 0 !important;
      }

      /* Botón gris "Invite Reviewers" con altura reducida */
      html.${ROOT_CLASS} .PageHeader .invitebutton,
      html.${ROOT_CLASS} .PageHeader .invitebutton.disabled {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 66px !important;
        min-width: 66px !important;
        max-width: 68px !important;
        height: 27px !important;
        min-height: 27px !important;
        max-height: 27px !important;
        padding: 1px 4px !important;
        margin: 0 !important;
        background-color: #555555 !important;
        color: #ffffff !important;
        font-size: 10px !important;
        font-weight: 700 !important;
        line-height: 1.05 !important;
        text-align: center !important;
        border-radius: 4px !important;
        text-decoration: none !important;
        white-space: normal !important;
        word-break: break-word !important;
        box-sizing: border-box !important;
      }

      /* Contador "Clips Labeled:\n[Número]" con líneas separadoras */
      html.${ROOT_CLASS} .PageHeader .ClipCount {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        height: 32px !important;
        border-left: 1px solid rgba(255, 255, 255, 0.25) !important;
        border-right: 1px solid rgba(255, 255, 255, 0.25) !important;
        padding: 0 10px !important;
        margin: 0 !important;
        font-size: 11px !important;
        font-weight: 700 !important;
        line-height: 1.15 !important;
        color: #ffffff !important;
        text-align: center !important;
        white-space: nowrap !important;
        box-sizing: border-box !important;
      }

      html.${ROOT_CLASS} .PageHeader .ClipCount b {
        display: block !important;
        font-size: 10.5px !important;
        color: #38bdf8 !important;
        font-weight: 700 !important;
        line-height: 1.1 !important;
        margin-bottom: 1px !important;
      }

      /* Nombre de usuario */
      html.${ROOT_CLASS} .PageHeader .right p:not(.ClipCount) {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 6px !important;
        margin: 0 !important;
        padding: 0 !important;
        font-size: 12px !important;
        font-weight: 700 !important;
        color: #ffffff !important;
        white-space: nowrap !important;
      }

      /* Botón de Logout cuadrado verde con icono ▶ */
      html.${ROOT_CLASS} .PageHeader .right p:not(.ClipCount) a[href*="logout"] {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 22px !important;
        height: 22px !important;
        min-width: 22px !important;
        min-height: 22px !important;
        background-color: #6ea31d !important;
        color: transparent !important;
        border-radius: 4px !important;
        position: relative !important;
        text-decoration: none !important;
        margin: 0 0 0 2px !important;
        padding: 0 !important;
        font-size: 0 !important;
        overflow: hidden !important;
        cursor: pointer !important;
      }

      html.${ROOT_CLASS} .PageHeader .right p:not(.ClipCount) a[href*="logout"]::after {
        content: "▶" !important;
        color: #ffffff !important;
        font-size: 10px !important;
        line-height: 1 !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-45%, -50%) !important;
      }

      /* Ajuste proporcional para pantallas ≤360px */
      @media ${SMALL_MQ} {
        html.${ROOT_CLASS} .PageHeader {
          padding: 4px 6px !important;
          height: 56px !important;
          min-height: 56px !important;
          max-height: 56px !important;
        }
        html.${ROOT_CLASS} .PageHeader .CSLogo {
          max-width: 65px !important;
          height: 26px !important;
        }
        html.${ROOT_CLASS} .PageHeader .right {
          gap: 6px !important;
        }
        html.${ROOT_CLASS} .PageHeader .invitebutton,
        html.${ROOT_CLASS} .PageHeader .invitebutton.disabled {
          width: 58px !important;
          min-width: 58px !important;
          height: 25px !important;
          min-height: 25px !important;
          font-size: 9px !important;
        }
        html.${ROOT_CLASS} .PageHeader .ClipCount {
          padding: 0 6px !important;
          font-size: 10px !important;
        }
        html.${ROOT_CLASS} .PageHeader .ClipCount b {
          font-size: 9.5px !important;
        }
        html.${ROOT_CLASS} .PageHeader .right p:not(.ClipCount) {
          font-size: 11px !important;
        }
      }

      /* === 2. INSTRUCCIONES COLAPSABLES (React-Safe Wrapper) === */
      html.${ROOT_CLASS} details.vacnet-m-instructions {
        margin: 8px 10px !important;
        padding: 12px !important;
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 8px !important;
        background: #141416 !important;
        overflow: visible !important;
      }

      html.${ROOT_CLASS} .vacnet-m-instructions > summary {
        list-style: none !important;
        cursor: pointer !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        color: #d0d0d0 !important;
        text-align: center !important;
      }
      html.${ROOT_CLASS} .vacnet-m-instructions > summary::-webkit-details-marker { display: none; }
      html.${ROOT_CLASS} .vacnet-m-instructions > summary::after { content: " ▾"; color: #888; }
      html.${ROOT_CLASS} .vacnet-m-instructions[open] > summary::after { content: " ▴"; }

      html.${ROOT_CLASS} .vacnet-m-instructions h3.list-title,
      html.${ROOT_CLASS} .vacnet-m-instructions .list-title {
        text-align: center !important;
        font-size: 16px !important;
        font-weight: 700 !important;
        margin: 8px 0 !important;
        color: #e0e0e0 !important;
      }

      html.${ROOT_CLASS} .vacnet-m-instructions p,
      html.${ROOT_CLASS} .vacnet-m-instructions .top-section-text,
      html.${ROOT_CLASS} .vacnet-m-instructions ul,
      html.${ROOT_CLASS} .vacnet-m-instructions ol,
      html.${ROOT_CLASS} .vacnet-m-instructions li {
        text-align: left !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
        color: #c8c8c8 !important;
        margin: 4px 0 !important;
      }

      /* === Contenedor flex principal === */
      html.${ROOT_CLASS} .flex-row-wrap,
      html.${ROOT_CLASS} .top-section-flex {
        flex-direction: column !important;
        align-items: stretch !important;
        width: 100% !important;
        max-width: 100% !important;
        gap: 6px !important;
        padding: 0 !important;
        margin: 0 !important;
        box-sizing: border-box !important;
        overflow: visible !important;
      }

      html.${ROOT_CLASS} .video-column,
      html.${ROOT_CLASS} .top-section,
      html.${ROOT_CLASS} .verdict-column {
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: visible !important;
      }

      html.${ROOT_CLASS} .verdict-column.size-for-column {
        margin-top: 0 !important;
      }

      html.${ROOT_CLASS} .top-section-logo,
      html.${ROOT_CLASS} .vaclive-logo {
        margin: 4px auto !important;
        padding: 0 !important;
      }

      /* === 3. VideoContainer: sticky tope arriba === */
      html.${ROOT_CLASS} .videocontainer {
        position: sticky !important;
        top: var(--vacnet-header-h, 52px) !important;
        z-index: 1001 !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        height: auto !important;
        aspect-ratio: 33 / 20 !important;
        max-height: 60vh !important;
        background: #000 !important;
        display: flex !important;
        flex-direction: column !important;
      }

      html.${ROOT_CLASS} .videocontainer .video-js {
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        flex-direction: column !important;
        padding-bottom: 0 !important;
        background: #000 !important;
      }

      html.${ROOT_CLASS} .videocontainer .video-js .vjs-tech,
      html.${ROOT_CLASS} .videocontainer .video-js video {
        position: relative !important;
        width: 100% !important;
        height: auto !important;
        aspect-ratio: 33 / 20 !important;
        flex: 0 0 auto !important;
      }

      /* === 4. CONTROLES DEL VIDEO (vjs-control-bar optimizada y responsive) === */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-control-bar {
        position: absolute !important;
        bottom: 0 !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        height: 42px !important;
        background: linear-gradient(0deg, rgba(10, 10, 11, 0.95) 0%, rgba(10, 10, 11, 0.6) 70%, transparent 100%) !important;
        display: flex !important;
        flex-direction: row !important;
        flex-wrap: nowrap !important;
        align-items: center !important;
        justify-content: space-between !important;
        padding: 0 4px !important;
        box-sizing: border-box !important;
        z-index: 10 !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      /* 1. Play / Pause */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-play-control {
        width: 36px !important;
        min-width: 36px !important;
        max-width: 36px !important;
        height: 42px !important;
        font-size: 15px !important;
        flex: 0 0 36px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* 2. Volumen / Mute (Solo botón toggle para móvil) */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-volume-panel {
        width: 34px !important;
        min-width: 34px !important;
        max-width: 34px !important;
        height: 42px !important;
        flex: 0 0 34px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-mute-control {
        width: 100% !important;
        height: 100% !important;
        font-size: 15px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-volume-control {
        display: none !important; /* Oculta la barra expandible que desborda en móvil */
      }

      /* 3. Tiempos (Actual / Total) */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-time-control,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-current-time,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-duration,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-time-divider {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        height: 42px !important;
        line-height: 42px !important;
        font-size: 11px !important;
        font-family: monospace, sans-serif !important;
        color: #e0e0e0 !important;
        padding: 0 1px !important;
        min-width: unset !important;
        width: auto !important;
        flex: 0 0 auto !important;
        margin: 0 !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-time-divider {
        padding: 0 2px !important;
        min-width: 6px !important;
      }

      /* 4. Barra de Progreso / Timeline */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-progress-control {
        flex: 1 1 auto !important;
        display: flex !important;
        align-items: center !important;
        height: 42px !important;
        min-width: 40px !important;
        margin: 0 6px !important;
        padding: 0 !important;
        touch-action: none !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-progress-holder {
        height: 4px !important;
        border-radius: 2px !important;
        margin: 0 !important;
        background-color: rgba(255, 255, 255, 0.25) !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-play-progress {
        background-color: #6ea31d !important;
        border-radius: 2px !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-play-progress::before {
        font-size: 10px !important;
        top: -3px !important;
        color: #fff !important;
      }

      /* 5. Velocidad de Reproducción */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate {
        width: 36px !important;
        min-width: 36px !important;
        max-width: 36px !important;
        height: 42px !important;
        flex: 0 0 36px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: relative !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate .vjs-playback-rate-value {
        font-size: 12px !important;
        font-weight: 700 !important;
        line-height: 42px !important;
        color: #ffffff !important;
        position: static !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate .vjs-menu {
        bottom: 42px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        width: 55px !important;
        margin-bottom: 0 !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate .vjs-menu-content {
        background-color: rgba(20, 20, 22, 0.95) !important;
        border-radius: 6px !important;
        padding: 4px 0 !important;
      }
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate .vjs-menu-item {
        font-size: 11px !important;
        padding: 4px 0 !important;
        line-height: 1.2 !important;
      }

      /* 6. Pantalla Completa */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-fullscreen-control {
        width: 36px !important;
        min-width: 36px !important;
        max-width: 36px !important;
        height: 42px !important;
        font-size: 14px !important;
        flex: 0 0 36px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      /* 7. Ocultar botones y elementos redundantes/no deseados */
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-remaining-time,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-picture-in-picture-control,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-subs-caps-button,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-subtitles-button,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-captions-button,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-audio-button,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-descriptions-button,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-chapters-button,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-seek-to-live-control,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-live-control,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-custom-control-spacer,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-skip-backward-undefined,
      html.${ROOT_CLASS} .videocontainer .video-js .vjs-skip-forward-undefined {
        display: none !important;
      }

      /* Ajustes para pantallas estrechas (<= 360px) */
      @media ${SMALL_MQ} {
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-control-bar {
          height: 38px !important;
          padding: 0 2px !important;
        }
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-play-control,
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-volume-panel,
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate,
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-fullscreen-control {
          width: 32px !important;
          min-width: 32px !important;
          max-width: 32px !important;
          height: 38px !important;
          flex: 0 0 32px !important;
          font-size: 13px !important;
        }
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-playback-rate .vjs-playback-rate-value {
          font-size: 11px !important;
          line-height: 38px !important;
        }
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-time-control,
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-current-time,
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-duration,
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-time-divider {
          height: 38px !important;
          line-height: 38px !important;
          font-size: 10px !important;
        }
        html.${ROOT_CLASS} .videocontainer .video-js .vjs-progress-control {
          margin: 0 4px !important;
          height: 38px !important;
        }
      }

      /* === 5. VerdictsContainer === */
      html.${ROOT_CLASS} .verdict-column,
      html.${ROOT_CLASS} .verdicts-container {
        width: 100% !important;
        max-width: 100% !important;
        min-height: auto !important;
        margin-top: 0 !important;
        padding: 10px !important;
        box-sizing: border-box !important;
        float: none !important;
        z-index: auto !important;
      }

      html.${ROOT_CLASS} .verdict-block {
        margin: 0 8px !important;
      }

      html.${ROOT_CLASS} .verdict-desc,
      html.${ROOT_CLASS} .verdictbutton label {
        font-size: clamp(13px, 3.5vw, 16px) !important;
        line-height: 1.3 !important;
        white-space: normal !important;
        word-break: break-word !important;
        text-align: center !important;
      }

      html.${ROOT_CLASS} .verdictbutton {
        flex: 1 1 0 !important;
        min-width: 0 !important;
        max-width: 33.33% !important;
        margin: 0 !important;
        padding: 2px !important;
        box-sizing: border-box !important;
      }

      html.${ROOT_CLASS} .verdictbutton label,
      html.${ROOT_CLASS} .verdictbutton button {
        width: 100% !important;
        font-size: clamp(11px, 2.8vw, 13px) !important;
        line-height: 1.2 !important;
        padding: 8px 4px !important;
        text-align: center !important;
        white-space: normal !important;
        word-break: break-word !important;
        box-sizing: border-box !important;
        display: block !important;
      }

      /* === 6. SubmitButtons === */
      html.${ROOT_CLASS} #submitbuttons,
      html.${ROOT_CLASS} .submitbuttons {
        position: fixed !important;
        left: 0 !important;
        right: 0 !important;
        bottom: var(--vacnet-footer-h, 70px) !important;
        z-index: 1003 !important;
        display: flex !important;
        flex-wrap: nowrap !important;
        gap: 8px !important;
        width: 100% !important;
        padding: 8px 12px !important;
        background: #0a0a0b !important;
        border-top: 1px solid rgba(255,255,255,0.1) !important;
        box-sizing: border-box !important;
        justify-content: space-between !important;
        align-items: stretch !important;
      }

      html.${ROOT_CLASS} #submitbuttons > button,
      html.${ROOT_CLASS} #submitbuttons > a,
      html.${ROOT_CLASS} .submitbuttons > button,
      html.${ROOT_CLASS} .submitbuttons > a,
      html.${ROOT_CLASS} .submitverdictbutton,
      html.${ROOT_CLASS} #submitVerdictButton,
      html.${ROOT_CLASS} #backButton,
      html.${ROOT_CLASS} #confirmButton {
        flex: 1 1 0 !important;
        min-width: 0 !important;
        width: auto !important;
        min-height: 52px !important;
        margin: 0 !important;
        padding: 10px 8px !important;
        border-radius: 10px !important;
        font-size: 15px !important;
        font-weight: 700 !important;
        text-align: center !important;
        box-sizing: border-box !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      html.${ROOT_CLASS} #submitbuttons .vacnet-submitting,
      html.${ROOT_CLASS} .submitbuttons .vacnet-submitting,
      html.${ROOT_CLASS} #submitbuttons .status-text-container.vacnet-submitting {
        flex: 1 1 100% !important;
        text-align: center !important;
        padding: 14px 8px !important;
        background: rgba(255,255,255,0.05) !important;
        border-radius: 10px !important;
        color: #d0d0d0 !important;
        font-size: 15px !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      html.${ROOT_CLASS} .vacnet-notification {
        position: fixed !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        bottom: calc(var(--vacnet-footer-h, 70px) + var(--vacnet-submit-h, 70px) + 12px) !important;
        z-index: 1005 !important;
        padding: 8px 18px !important;
        background: #1f6f3f !important;
        border: 1px solid #2ea858 !important;
        border-radius: 8px !important;
        color: #fff !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        text-align: center !important;
        pointer-events: none !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        max-width: 90% !important;
      }

      /* === 7. Footer === */
      html.${ROOT_CLASS} footer.footer-container {
        padding: 5px 10px calc(5px + env(safe-area-inset-bottom, 0px)) !important;
        box-sizing: border-box !important;
      }

      html.${ROOT_CLASS} footer.footer-container .footer-buttons {
        gap: 10px !important;
        flex-wrap: wrap !important;
        font-size: clamp(10px, 2.8vw, 16px) !important;
      }

      html.${ROOT_CLASS} footer.footer-container p {
        font-size: clamp(8px, 2.5vw, 10px) !important;
        line-height: 1.2 !important;
        margin: 2px 0 !important;
        padding: 0 8px !important;
      }
    }
  `;

  function isMobile() {
    return window.matchMedia(MOBILE_MQ).matches;
  }

  function ensureViewport() {
    let meta = document.querySelector('meta[name="viewport"]');
    const content = "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover";
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      (document.head || document.documentElement).appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  function injectCss() {
    let style = document.getElementById(STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = STYLE_ID;
      (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = CSS;
  }

  function collapseInstructions() {
    const existing = document.querySelector("details.vacnet-m-instructions");

    if (!isMobile()) {
      if (existing && existing.__vacnetOriginalSection) {
        const originalSection = existing.__vacnetOriginalSection;
        while (existing.firstChild) {
          const child = existing.firstChild;
          if (child.tagName && child.tagName.toLowerCase() === 'summary') {
            existing.removeChild(child);
          } else {
            originalSection.appendChild(child);
          }
        }
        existing.parentNode.insertBefore(originalSection, existing);
        existing.remove();
      }
      return;
    }

    if (existing) return;

    const target = document.querySelector(".top-section");
    if (!target) return;
    if (!target.textContent.includes("Please watch the clip")) return;

    const details = document.createElement("details");
    details.className = "vacnet-m-instructions";
    details.open = false;

    const summary = document.createElement("summary");
    summary.textContent = "Instructions (tap to expand)";
    details.appendChild(summary);

    details.__vacnetOriginalSection = target;

    while (target.firstChild) {
      details.appendChild(target.firstChild);
    }

    target.replaceWith(details);
  }

  function reorderMobile() {
    if (!isMobile()) return;
    const video = document.querySelector("video");
    const verdictCol = document.querySelector(".verdict-column");
    if (!video || !verdictCol) return;

    const videoHost =
      video.closest(".size-for-column") ||
      video.closest("[class*='video']") ||
      video.parentElement;
    if (!videoHost?.parentElement) return;

    if (verdictCol.parentElement === videoHost.parentElement) {
      if (videoHost.nextElementSibling !== verdictCol) {
        videoHost.insertAdjacentElement("afterend", verdictCol);
      }
    }
  }

  function observeHeight(el, cssVar) {
    if (!el) return;
    const apply = () => {
      const h = Math.ceil(el.getBoundingClientRect().height);
      if (h > 0) document.documentElement.style.setProperty(cssVar, h + "px");
    };
    apply();
    if (!el.__vacnetRO && "ResizeObserver" in window) {
      const ro = new ResizeObserver(apply);
      ro.observe(el);
      el.__vacnetRO = ro;
    }
  }

  function syncBottomBars() {
    const footer = document.querySelector("footer.footer-container");
    const submit = document.querySelector("#submitbuttons, .submitbuttons");

    observeHeight(footer, "--vacnet-footer-h");
    observeHeight(submit, "--vacnet-submit-h");

    const applyCombined = () => {
      const fH = footer ? footer.getBoundingClientRect().height : 0;
      const sH = submit ? submit.getBoundingClientRect().height : 0;
      if (fH || sH) {
        document.documentElement.style.setProperty("--vacnet-bottom-h", Math.ceil(fH + sH) + "px");
      }
    };
    applyCombined();

    if (submit && !submit.__vacnetROCombined && "ResizeObserver" in window) {
      const ro = new ResizeObserver(applyCombined);
      ro.observe(submit);
      submit.__vacnetROCombined = ro;
    }
    if (footer && !footer.__vacnetROCombined && "ResizeObserver" in window) {
      const ro = new ResizeObserver(applyCombined);
      ro.observe(footer);
      footer.__vacnetROCombined = ro;
    }
  }

  function syncHeaderHeight() {
    observeHeight(document.querySelector(".PageHeader"), "--vacnet-header-h");
  }

  function captureNotifications() {
    if (!isMobile()) return;
    const submit = document.querySelector("#submitbuttons, .submitbuttons");
    if (!submit) return;

    const allElements = document.querySelectorAll("body *:not(script):not(style)");
    allElements.forEach((el) => {
      if (el === submit || submit.contains(el)) return;
      if (el.children.length > 0) return;
      const txt = (el.textContent || "").trim().toLowerCase();
      if (!txt) return;

      if ((txt === "submitting..." || el.classList.contains('status-text-container')) && !el.dataset.vacnetMoved) {
        el.dataset.vacnetMoved = "1";
        el.classList.add("vacnet-submitting");
        submit.innerHTML = "";
        submit.appendChild(el);
        submit.style.display = "flex";
      }

      if (txt.includes("labels submitted") && !el.dataset.vacnetNotif) {
        el.dataset.vacnetNotif = "1";
        el.classList.add("vacnet-notification");
        if (el.parentElement !== document.body) {
          document.body.appendChild(el);
        }
        setTimeout(() => {
          if (el && el.parentElement) {
            el.style.transition = "opacity 0.4s";
            el.style.opacity = "0";
            setTimeout(() => el.remove(), 400);
          }
        }, 3000);
      }
    });
  }

  function boot() {
    ensureViewport();
    injectCss();
    document.documentElement.classList.add(ROOT_CLASS);
    collapseInstructions();
    reorderMobile();
    syncHeaderHeight();
    syncBottomBars();
    captureNotifications();
  }

  boot();

  let layoutTimer = null;
  const scheduleLayout = () => {
    if (layoutTimer) clearTimeout(layoutTimer);
    layoutTimer = setTimeout(() => {
      layoutTimer = null;
      injectCss();
      document.documentElement.classList.add(ROOT_CLASS);
      collapseInstructions();
      reorderMobile();
      syncHeaderHeight();
      syncBottomBars();
    }, 200);
  };

  let notifTimer = null;
  const scheduleNotifs = () => {
    if (notifTimer) clearTimeout(notifTimer);
    notifTimer = setTimeout(captureNotifications, 50);
  };

  const mo = new MutationObserver(() => {
    scheduleLayout();
    scheduleNotifs();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener("orientationchange", () => setTimeout(scheduleLayout, 20));
  window.addEventListener("resize", scheduleLayout);
})();