/**
 * Copyright 2019-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger For Original Coast Clothing
 * https://developers.facebook.com/docs/messenger-platform/getting-started/sample-apps/original-coast-clothing
 */

"use strict";

// Imports dependencies
const Response = require("./response"),
  Survey = require("./survey"),
  config = require("./config"),
  i18n = require("../i18n.config");

module.exports = class Care {
  constructor(user, webhookEvent) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handlePayload(payload) {
    let response;

    switch (payload) {
      case "CARE_HELP":
        response = Response.genQuickReply(
          i18n.__("care.prompt", {
            userFirstName: this.user.firstName
          }),
          [
            {
              title: i18n.__("care.Covidstress"),
              payload: "CARE_COVIDSTRESS"
            },
            {
              title: i18n.__("care.Depression"),
              payload: "CARE_DEPRESSION"
            },
            {
              title: i18n.__("care.MentalHealth"),
              payload: "CARE_MENTALHEALTH"
            },
            {
              title: i18n.__("care.other"),
              payload: "CARE_OTHER"
            }
          ]
        );
        break;
      case "CARE_COVIDSTRESS":
        // Send using the Persona for order issues

        response = [
          Response.genTextWithPersona(
            i18n.__("care.issue", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaOrder.name,
              topic: i18n.__("care.Covidstress")
            }),
            config.personaOrder.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaOrder.id
          ),
          Survey.genAgentRating(config.personaOrder.name)
        ];
        break;

      case "CARE_DEPRESSION":
        // Send using the Persona for billing issues

        response = [
          Response.genTextWithPersona(
            i18n.__("care.issue", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaBilling.name,
              topic: i18n.__("care.Depression")
            }),
            config.personaBilling.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaBilling.id
          ),
          Survey.genAgentRating(config.personaBilling.name)
        ];
        break;

      case "CARE_MENTALHEALTH":
        // Send using the Persona for sales questions

        response = [
          Response.genTextWithPersona(
            i18n.__("care.issue", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaSales.name,
              topic: i18n.__("care.MentalHealth")
            }),
            config.personaSales.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaSales.id
          ),
          Survey.genAgentRating(config.personaSales.name)
        ];
        break;

      case "CARE_OTHER":
        // Send using the Persona for customer care issues

        response = [
          Response.genTextWithPersona(
            i18n.__("care.default", {
              userFirstName: this.user.firstName,
              agentFirstName: config.personaCare.name
            }),
            config.personaCare.id
          ),
          Response.genTextWithPersona(
            i18n.__("care.end"),
            config.personaCare.id
          ),
          Survey.genAgentRating(config.personaCare.name)
        ];
        break;
    }

    return response;
  }
};
