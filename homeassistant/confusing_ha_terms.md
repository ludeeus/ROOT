# Confusing HA terms

_Home Assistant, Hassio, HassOS, HA, Hass, WTF?_

## Home Assistant

_Let's start with an easy one._

Home Assistant is the automation platform (software) that we all run.
This is where you have your integrations, do automations and create awesome Lovelace views.

Some popular abbrevations of Home Assistant:

- **H**ome **A**ssistant (HA)
- **H**ome **Ass**istant (Hass)

[More information about Home Assistant](https://www.home-assistant.io/)

## Hassio / Hass.io

_Now things can get a little tricky._

Hassio is not Home Assistant, and Home Assistant is not Hassio.

Hassio is a way of installing Home Assistant (similar to `pip install homeassistant` and docker).

When you use one of the Hassio installers (HassOS/Generic linux) you get a set of docker containers in addition to the main part (Home Assistant)

**Base set of containers for Hassio:**

- Home Assistant
- Hassio Supervisor
- DNS

**Some key aspects:**

- _Every_ Hassio installation uses Docker.
- Hassio can be installed on _any_ linux OS.
- Hassio does not have automations
- Hassio does not have integrations
. The add-on store is _only_ available _if_ you installed Home Assistant with Hassio.

[More information about Hassio](https://www.home-assistant.io/hassio/)

## HassOS

HassOS is a OS based on buildroot, that ships with Hassio (and therefore also Home Assistant).

[More information about HassOS](https://github.com/home-assistant/hassos)

There are images available for many boards, as well as hypervisors.
