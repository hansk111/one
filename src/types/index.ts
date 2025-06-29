// 버스 정보 관련 타입들
export interface BusRoute {
  routeId: string;
  routeName: string;
  routeTypeName: string;
  districtCd: number;
  upFirstTime: string;
  upLastTime: string;
  downFirstTime: string;
  downLastTime: string;
  peekAlloc: number;
  nPeekAlloc: number;
  company: string;
  companyTel: string;
  startStationName: string;
  endStationName: string;
}

export interface BusStop {
  stationId: string;
  stationName: string;
  x: number; // 경도
  y: number; // 위도
  // districtCd: number;
  mobileNo: string;
  regionName: string;
  centerYn: string;
  distance?: number;
}

export interface BusStopAroundList {
  centerYn: string;
  mobileNo: string;
  regionName: string;
  stationId: number;
  stationName: string;
  x: number; // 경도
  y: number; // 위도
  distance: number;
}

export interface BusNearbyStop {
  response: {
    comMsgHeader: string;
    msgHeader: {
      queryTime: string;
      resultCode: string;
      resultMessage: string;
    };
    msgBody: {
      busStationAroundList: BusStopAroundList[];
    };
  };
}

export interface BusArrival {
  stationId: string;
  routeId: string;
  locationNo1: number;
  predictTime1: number;
  predictTimeSec1: number;
  locationNo2: number;
  predictTime2: number;
  predictTimeSec2: number;
  staOrder: number;
  flag: string;
  routeName: string;
  lowPlate1: number;
  lowPlate2: number;
  stationNm1: string;
  stationNm2: string;
  routeDestName: string;
}

export interface BusPosition {
  plateNo: string;
  routeId: string;
  stationId: string;
  remainSeatCnt: number;
  plateType: number;
  x: number;
  y: number;
}

// API 응답 타입들
export interface ApiResponse<T> {
  comMsgHeader: string;
  msgHeader: {
    queryTime: string;
    resultCode: string;
    resultMessage: string;
  };
  msgBody: T;
}

export interface BusRouteListResponse {
  busRouteList: BusRoute[];
}

export interface BusStopListResponse {
  busStationAroundList: BusStop[];
}

export interface BusArrivalResponse {
  busArrivalList: BusArrival[];
}

// Redux 상태 타입들
export interface AppState {
  favorites: string[];
  recentSearches: string[];
  currentLocation: {
    latitude: number;
    longitude: number;
  } | null;
}
