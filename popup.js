// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let showBtn = document.getElementById('showBtn');
let downConfigBtn = document.getElementById('downConfig');
let downFileBtn = document.getElementById('downFile');

showBtn.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'IconFontUtils.showIcons()'});
  });
};

downConfigBtn.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'IconFontUtils.downloadConfig()'});
  });
};

downFileBtn.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'IconFontUtils.downloadFontFile()'});
  });
};
