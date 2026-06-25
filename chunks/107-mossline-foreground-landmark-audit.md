# Chunk 107: Mossline Foreground Landmark Audit

Status: complete

## Goal

Audit all ten Mossline scenes before producing or rewiring foreground landmarks.
Each scene should have one strong side-view rail/signal repair landmark, with
no random cottages, loose repair clutter, broken-branch clutter, or generic
repair marker.

## Completed

Audit result by scene:

| Scene | Landmark decision |
|-------|-------------------|
| Mossline Switchyard | Keep `mossline-switchyard-painted.png`; it is a strong single rail/signal junction landmark. |
| Cargo Cart Turntable | Keep `cargo-cart-turntable-painted.png`; it is already wired as the single turntable/cart landmark. |
| Signal Arm Row | Keep `signal-arm-row-painted.png`; it is already wired as a single semaphore row landmark. |
| Conductor Booth | Keep bespoke side-view booth/route-board renderer; generated painted asset still reads too angled/isometric. |
| Crane Hook Yard | Keep bespoke side-view crane/hook renderer; generated painted asset still reads too angled/isometric. |
| Sparking Relay Shed | Keep existing side-view painted shed renderer and relay overlays. |
| Rain-Slick Rails | Keep existing side-view rail renderer using `rain-slick-rails-side-sprite.png`; the older angled rail sprite remains unused. |
| Tunnel Mouth | Keep bespoke side-view portal renderer; generated painted asset reads angled/three-quarter. |
| Clock Signal | Keep bespoke side-view station-clock renderer; generated asset has cleanup/crop issues. |
| Last Platform | Keep bespoke side-view platform renderer; generated asset reads angled/isometric and still has generated-background issues. |

## Verification

- Source check instantiated all ten Chapter 3 scenes and confirmed each has:
  `showMarker: false`, `0` cottages, `0` repair parts, and `0` broken branches.
- Confirmed each scene either has an approved `paintedLandmark` or a bespoke
  side-view scene state/renderer.

## Next

Chunk 108: preserve/produce the approved foreground landmark set from this
audit.
