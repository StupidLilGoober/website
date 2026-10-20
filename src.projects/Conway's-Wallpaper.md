---
title: "Conway's Wallpaper"
layout: project
github: stupidlilgoober/conways-wallpaper
badge: stupidlilgoober/conways--wallpaper
finished: yes
thumbnail: "https://raw.githubusercontent.com/StupidLilGoober/conways-wallpaper/main/preview.gif"
---

Conway's Wallpaper is a very simple program. Technically, the executable itself just
prints raw RGB data into `stdout`, but the real cool stuff is in `x11.sh` and `wayland.sh`.

## What the Program Does

The program pipes RGB data into other programs. These programs are actually video software,
which are then piped to software that redirects videos to the desktop.
