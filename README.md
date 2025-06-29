# one app 👋

## 설치

```
npx create-expo-app@latest
```

```
npm run reset-project
```

------------> git 1. commit

src 폴더 생성 -> app 디렉토리 이동 -> tsconfig.json 수정

    "paths": {
      "@/*": [
        "./src/*"
      ]
    }

------------> git 2. commit

npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install -D tailwindcss@^3.4.17

prettier-plugin-tailwindcss 는 설치하지 않음.
나머지는 https://www.nativewind.dev/docs/getting-started/installation 참조

------------> git 3. commit

login 기능 구현
blog 기능 구현
expo preview build 작성 정상 동작 함.

------------> git 4. commit

첫번째 프리뷰 빌드

npm install -g eas-cli

eas build:configure

두번째 프리뷰 빌드

eas build --profile preview --platform android

블로그 상세 페이지로 넘어 갈때 비정상 종료됨, blog 폴더의 layout file 삭제함........

- 블로그, 무비, 이미지, 뮤직 모두 정상동작함.

------------> git 5. commit

# git commit

1. expo app 기본 생성
2. src폴더 생성
3. nativewind 적용
4. login, blog 기능 적용용
5. 기본적인 모든 기능 정상 동작작

https://apis.data.go.kr/6410000/busstationservice/v2/getBusStationAroundListv2?format=json&serviceKey=aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D&x=127.0284667&y=37.49545

http://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteListv2?format=json&serviceKey=aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D&keyword=11

https://apis.data.go.kr/6410000/busrouteservice/v2/getBusRouteInfoItemv2?format=json&serviceKey=aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D&routeId=200000085

https://apis.data.go.kr/6410000/busstationservice/v2/getBusStationListv2?format=json&serviceKey=aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D&keyword=12

https://apis.data.go.kr/6410000/buslocationservice/v2/getBusLocationListv2?format=json&serviceKey=aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D&routeId=233000031

https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?format=json&serviceKey=aWsujMzFxQK0AzBWEoTA0EqQPRx3Zv6d2KTXViiEllyvszqHgKXH%2B2Z2Vtl7a%2FMkhg%2BTDmLG%2F7%2FPt5rkw4eVfA%3D%3D&stationId=200000078
