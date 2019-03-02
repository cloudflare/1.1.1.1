const locales: { [index: string]: any } = {};

locales["en-US"] = require("./en-US.json");
locales["es-ES"] = require("./es_es/es_es.json");
locales["fr-FR"] = require("./fr_fr/fr_fr.json");
locales["de-DE"] = require("./de_de/de_de.json");
locales["nl-NL"] = require("./nl/nl.json");
locales["zh-Hans"] = require("./zh_cn/zh_cn.json");
locales["zh-Hant"] = require("./zh_tw/zh_tw.json");
locales["ja-JP"] = require("./ja_jp/ja_jp.json");
locales["ko-KR"] = require("./ko/ko.json");
locales["pt-BR"] = require("./pt_br/pt_br.json");
locales["tr-TR"] = require("./tr/tr.json");
locales["id-ID"] = require("./id/id.json");
locales["pl-PL"] = require("./pl/pl.json");

export default locales;
