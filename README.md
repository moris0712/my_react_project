# React / Node.js 를 이용한 개인 홈페이지 제작

Front_end : React  
Back_end : Node.js + express  
Database : Mysql  
개발기간: 2021/07/04 ~ 2021/09/08  
시연영상 : https://youtu.be/E9vW1kw2660

---
<br/>

목차
==================================================================================
+ [목적](#목적)
+ [사용 라이브러리 / 프레임워크](#사용-라이브러리-/-프레임워크)
+ [백엔드](#백엔드)
  * [회원가입](#회원가입)
    - Salt
  * [로그인](#로그인)
    - Session DB
  * [로그아웃](#로그아웃)
  * [게시판](#게시판)
    - 답글
    - 추천

<br/>

목적
===================================================================================
- 따로 사용 목적은 없으며 내가 만들어 보고싶은 나만의 페이지를 만들기 위한 목적으로 구현
- 이론으로 배운 웹 어플리케이션 / DB / 서버를 적용해 보기 위한 실습  

<br/>

사용 라이브러리 / 프레임워크
====================================================================================
- 가장 상용적으로 사용중인 프론트 웹 프레임 워크 React   
  1. 사용자 입장에서 데이터가 변할 때 페이지 리로딩이 일어나지 않아 UX가 더욱 향상됨  
  2. 간단한 대중성 그리고 넓은 활용성   
- React와 연동이 쉬운 자바스크립트 기반의 Nodej.s  
- 다양한 운영체제에서 사용가능한 MySQL  



<br/>

백엔드
==============================================================================
+ ## 회원가입  

  ![회원가입](https://user-images.githubusercontent.com/22339727/174723601-86685230-fade-4b3a-9278-234237ba8efa.png)  
  
  - 본래는 매우 비효율적이지만 로컬 홈페이지이므로 Inputfield가 바뀔때마다 실시간으로 서버에 요청하여 중복아이디 검사  
    |중복된 아이디 일때|사용 가능한 아이디 일때|
    |:-:|:-:|
    |![중복](https://user-images.githubusercontent.com/22339727/174723733-0a6ce33d-d6a2-4a8f-b22a-1789783942d4.png)|![사용가능](https://user-images.githubusercontent.com/22339727/174723737-5c5c3fc9-d757-4e2f-b03f-ee2970a29720.png)|
  
  - 비밀번호 / 비밀번호 확인은 실시간으로 클라이언트에서 검사
    |비밀번호 불일치|비밀번호 일치|
    |:-:|:-:|
    |![비밀번호 불일치](https://user-images.githubusercontent.com/22339727/174724378-cfb084d7-7d43-4624-8d78-bb3b21746645.png)|![비밀번호 일치](https://user-images.githubusercontent.com/22339727/174724375-d61866e7-6f91-4cbd-bced-7ad3f13a9e36.png)|

  - InputField 클라이언트에서 검사
    |아이디 공백 / 특수문자 포함 여부 확인|비밀번호 공백 포함 여부 확인|
    |:-:|:-:|
    |![아이디](https://user-images.githubusercontent.com/22339727/174724843-d4ab624c-e20e-4b03-9abb-5f887d63c802.png)|![비밀번호](https://user-images.githubusercontent.com/22339727/174724849-f835dd23-7dfc-40ad-8a91-559ef6519e8a.png)|
  
<br/>
  
  - ## Salt
    - DB에 비밀번호를 그대로 집어넣지 않는다 -> 관리자 혹은 해커가 확인할 수 있고 악용할 수 있기때문
    - 따라서 단방향으로 암호화가 가능하고 복호화가 불가능한 암호화가 필요 (비밀번호 찾기를 할때 원래 비밀번호를 알려주는 것이 아닌 재설정 하는 이유)
    - 또한 같은 비밀번호를 암호화하였을때 값이 달라야하므로 임의의 문자열을 추가하여 암호화  
    ![Salt_1](https://user-images.githubusercontent.com/22339727/174766271-ebbb1aae-0e77-4640-a649-73b8110fb443.png)  
    ![Salt](https://user-images.githubusercontent.com/22339727/174726215-36f16265-0b85-42a8-93fd-313a8d09d47b.png)  
    
    - 암호화된 비밀번호  
    ![비밀번호](https://user-images.githubusercontent.com/22339727/174729959-ee5b2f5b-8807-4713-909e-5feb2c31bb4b.png)

<br/>

+ ## 로그인
   ![로그인](https://user-images.githubusercontent.com/22339727/174720811-bdb346f7-e35c-42cc-818d-55e2599a2e31.png)
    |한 항목이라도 입력하지 않았을 시|DB에 아이디가 없을 시|DB에 아이디가 있지만 비밀번호가 틀렸을 시|
    |:-:|:-:|:-:|
    |![스크린샷 2022-06-21 오후 2 11 10](https://user-images.githubusercontent.com/22339727/174720882-df21cf9c-bb5b-4722-a24e-31110ad36c82.png)|![스크린샷 2022-06-21 오후 2 11 20](https://user-images.githubusercontent.com/22339727/174720889-5a9fe584-3f62-4597-9cd9-b9b0b49c9fc2.png)|![스크린샷 2022-06-21 오후 2 11 29](https://user-images.githubusercontent.com/22339727/174720894-04779f37-fd35-425a-887a-d28027bebf4f.png)| ![login_logic](https://user-images.githubusercontent.com/22339727/174723066-3a8d5bf2-9881-4162-9d07-2a29f1d468d8.png) |  
  
  
  - 로그인에 성공하면 서버에 세션 저장  
  ![세션](https://user-images.githubusercontent.com/22339727/174730670-89046fda-ac77-477e-83ef-117122bdd0a3.png)  
  ![세션저장](https://user-images.githubusercontent.com/22339727/174730820-79b6af66-f31d-4aae-9383-d89d4f969f0c.png)  
  
  - Sessions DB  
  ![세션](https://user-images.githubusercontent.com/22339727/174765880-4299b360-e447-4c34-aa07-0ed0fe3449e1.png)  
  ![세션 DB](https://user-images.githubusercontent.com/22339727/174731102-f4427829-c06f-4192-9349-10802de4ee4c.png)
  
  
<br/>

+ ## 로그아웃
  - 로그아웃시, 서버에 저장되어있는 세션 삭제  
    ![로그아웃](https://user-images.githubusercontent.com/22339727/174732068-8badb83c-14a4-4018-bb52-d40b422aaf64.png)


<br/>

+ ## 게시판
  |게시판 리스트|게시판 내용|
  |:-:|:-:|
  |![게시판](https://user-images.githubusercontent.com/22339727/174733420-f5650059-db12-448b-9bf9-8bef3aa22eea.png)|![게시판 내용](https://user-images.githubusercontent.com/22339727/174755546-e995e016-4d0a-43ab-8b8d-4fea88cf5e8c.png)|  
  
  <img width="544" alt="image" src="https://user-images.githubusercontent.com/22339727/174758473-fbc0f4c2-ccc0-4545-b899-aa2c7f9e2f66.png">  
  
  - 게시판은 Board 테이블에 저장되어있으며, 댓글, 추천수는 각각 Board_Comment, Board_Recommend 테이블을 이용하여 게시판 번호와 일치하는 데이터들을 가져온다.

<br/>

  * ### 답글  
    ![답글](https://user-images.githubusercontent.com/22339727/174760612-f44231f8-544e-416e-b164-c5ba4ed1d468.png)   
    - 루트 댓글 (부모가 없는 댓글)의 parent_idx는 0 이고 자식 댓글은 parent_idx로 부모 댓글의 idx를 가진다.  

<br/>

  * ### 추천  
    |내가 추천하지않았을때|내가 추천하였을때|
    |:-:|:-:|
    |![추천하지않았을때](https://user-images.githubusercontent.com/22339727/174763382-4b0d5fdc-4e2d-4915-8304-1ff920fdd064.png)|![추천하였을때](https://user-images.githubusercontent.com/22339727/174763361-e6dbdb0d-9826-424b-869c-761252ff6076.png)|  
    
    - 내가 이미 추천하였을때 (true)이면 추천정보를 Delete하고 내가 추천하지 않은상태 일때(false)일때 Insert 한다.  
    ![sql](https://user-images.githubusercontent.com/22339727/174765174-26f78d19-7166-4bfc-87b6-bf5826d7e156.png)

