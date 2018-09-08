function loadData () {
  var iconList = document.querySelector('#J_project_detail').getElementsByClassName('project-iconlist')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
  var result = [];
  var iconMap = {};
  for (var i = 0; i < iconList.length; i++) {
    var iconDom = iconList[i];
    var iconName = iconDom.getElementsByTagName('span')[0].innerText;
    var iconCode = iconDom.getElementsByTagName('span')[1].innerText.replace('&#', '0');
    var iconId = iconDom.getElementsByTagName('span')[2].innerText;
    iconId = iconId.substring(iconId.indexOf('-') + 1);
    iconCode = parseInt(iconCode);
    result.push({
      iconId: iconId.substring(iconId.indexOf('-') + 1),
      iconCode: iconCode,
      iconName: iconName
    });
    iconMap[iconId] = iconCode;
  }
  return {
    iconList: result,
    iconMap: iconMap
  };
}

function showIcons () {
  var loadResult = loadData();
  var result = loadResult.iconList;
  var iconMap = loadResult.iconMap;
  var containerDom = document.createElement('div');
  containerDom.style.position = 'absolute';
  containerDom.style.top = 0;
  containerDom.style.width = '100%';
  containerDom.style.height = '100%';
  containerDom.style.left = 0;
  containerDom.style.background = 'rgba(0, 0, 0, 0.45)';

  var resultDom = document.createElement('div');
  resultDom.innerHTML = '<h2>图标列表:</h2><pre>' + JSON.stringify(result) + '</pre>';
  resultDom.innerHTML = resultDom.innerHTML + '<h2>React-Native 配置:</h2><pre>' + JSON.stringify(iconMap) + '</pre>';
  resultDom.style.zIndex = 888;
  resultDom.style.position = 'absolute';
  resultDom.style.top = '120px';
  resultDom.style.width = '48%';
  resultDom.style.minHeight = '40%';
  resultDom.style.left = '26%';
  resultDom.style.background = '#fff';
  resultDom.style.borderRadius = '5px';
  resultDom.style.padding = '15px';

  var closeDom = document.createElement('div');
  closeDom.style.position = 'absolute';
  closeDom.style.left = '74%';
  closeDom.style.marginLeft = '15px';
  closeDom.style.fontSize = '24px';
  closeDom.style.color = '#333';
  closeDom.style.top = '105px';
  closeDom.style.width = '30px';
  closeDom.style.height = '30px';
  closeDom.style.borderRadius = '50%';
  closeDom.style.borderColor = '#666';
  closeDom.style.borderWidth = '1px';
  closeDom.style.background = 'rgba(255, 255, 255, 0.9)';
  closeDom.style.cursor = 'pointer';
  closeDom.style.zIndex = 999;
  closeDom.style.textAlign = 'center';
  closeDom.innerHTML = 'X';

  closeDom.addEventListener('click', function() {
    containerDom.remove();
  });

  containerDom.appendChild(closeDom);
  containerDom.appendChild(resultDom);
  document.body.appendChild(containerDom);
}
// 下载配置
function downloadConfig () {
  var loadResult = loadData();
  var result = loadResult.iconList;
  var iconMap = loadResult.iconMap;
  var iconListBlob = new Blob([JSON.stringify(result, null, 2)], { type: "text/json,charset=UTF-8" });
  var iconMapBlob = new Blob([JSON.stringify(iconMap, null, 2)], { type: "text/json,charset=UTF-8" });
  var iconListUrl = window.URL.createObjectURL(iconListBlob);
  var iconMapUrl = window.URL.createObjectURL(iconMapBlob);
  var linkDom = document.createElement('a');
  linkDom.href = iconListUrl;
  linkDom.target = '_blank';
  linkDom.download = 'iconlist.json'
  linkDom.click();

  var linkDom2 = document.createElement('a');
  linkDom2.href = iconMapUrl;
  linkDom2.target = '_blank';
  linkDom2.download = 'Iconfonts.json'
  linkDom2.click();
}

function downloadFontFile () {
  var fileContent = document.getElementById('J_cdn_type_unicode').innerText;
  fileContent = fileContent.substring(fileContent.indexOf('(') + 2, fileContent.indexOf(')') - 1);
  var ttfUrl = fileContent.substring(0, fileContent.lastIndexOf('.')) + '.ttf';
  var linkDom = document.createElement('a');
  linkDom.href = ttfUrl;
  linkDom.target = '_blank';
  linkDom.download = 'iconfont';
  linkDom.click();
}

window.IconFontUtils = {
  showIcons: showIcons,
  downloadConfig: downloadConfig,
  downloadFontFile: downloadFontFile
}