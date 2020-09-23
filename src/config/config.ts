
const apiUrl= {
  // dev: 'http://152.136.12.146:8081/',
  // pro: 'http://152.136.12.146:8081/'
  dev: 'http://localhost:8080/',
  pro: 'http://localhost:8080/'
}
const webUrl= {
  dev: 'http://localhost:8080/',
  pro: 'http://localhost:8080/'
}

const amapKey="648c1c6c1e0f3006fb250e730dd04f8f"

const baseUrl = process.env.NODE_ENV === 'development' ? apiUrl.dev : apiUrl.pro
const baseWebUrl = process.env.NODE_ENV === 'development' ? webUrl.dev : webUrl.pro
const DownloadFilfUrl={
    GnssData:`${baseUrl}api/v1/GetSureFaceDataExcel`,
    FtaData:`${baseUrl}api/v1/GetFlexDataExcel`,
    RainData:`${baseUrl}api/v1/GetRainDataExcel`,
    IcpData:`${baseUrl}api/v1/getIntellectualCorePileExcel`,
    WaterLevelData:`${baseUrl}api/v1/GetWaterLevelDataExcel`,
    WaterPressureData:`${baseUrl}api/v1/GetWaterPressureDataExcel`,
}

const defaultConfigValue={
  barMaxWidth:20
}

export {
    apiUrl,webUrl,amapKey,DownloadFilfUrl,baseUrl,baseWebUrl,defaultConfigValue
}