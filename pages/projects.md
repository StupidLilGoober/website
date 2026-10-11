---
layout: default
title: "Projects"
date: 2026-5-20
permalink: "/projects/"
---

# Projects

{% for project in site.projects %}
  <h2><a href="{{ project.url }}">{{ project.title }}</a></h2>

  <p>
    <a href="https://github.com/{{ project.github }}">
      <img src="https://img.shields.io/badge/GitHub-{{ project.badge }}-gray?logo=github&logoColor=white">
    </a>
  </p>

  {% if project.thumbnail %}
  <img src="{{ project.thumbnail }}" width="512" height="288" alt="{{ project.title }} thumbnail">
  {% endif %}

  <p>{{ project.desc }}</p>
{% endfor %}
