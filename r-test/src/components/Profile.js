import React, { Component } from "react";
import profile_img from '../img/profile.jpeg';

class Profile extends Component {

    render() {

        return (
            <div id="profile_p2_div_div">
                <div id="profile_p2_div">
                    <div id="profile_p2">
                        <span >About Me</span>
                    </div>
                    <br/>
                    <div className="profile">
                        <div id="inform">
                            <div id="profile_img_div">
                                <img src={profile_img} id="profile_img" alt="logo" />
                            </div>
                            <div id="profile_inform">
                                <div></div>
                                <div id="profile_inform_title">
                                    <p className="content_title">이름 </p>
                                    <p className="content_title"> 생년월일 </p>
                                    <p className="content_title">주소 </p>
                                    <p className="content_title">이메일 </p>
                                </div>
                                <div id="profile_inform_content">
                                    <p className="content">박준영</p>
                                    <p className="content">1997.07.12</p>
                                    <p className="content">서울시 노원구</p>
                                    <p className="content">ib0712@naver.com</p>
                                </div>
                                <div></div>
                            </div>
                        </div>

                        <div id="spec">
                            <div>
                                <p className="content_title">► 경력</p>
                                <div className="career_inform">
                                    <div>
                                        <p className="content_title">2021.03 </p> 
                                        <p>&nbsp;</p>
                                        <p className="content_title">2020.09 </p>
                                    </div>
                                    <div>
                                         
                                        <p className="content">(주)다해줘테크 인턴</p>
                                        <p> Asp, Etherum, 웹 기획 등 경험</p>
                                        <p className="content">(주)솔루게이트 인턴</p>
                                        <p> 음성 합성 모델 Tacotron2 실행</p> 
                                        <p> 한국어 음성 합성 모델 실행 </p>
                                        <p> Mysql -&gt; Postgresql migration   </p>
                                    </div>
                                    <div></div>
                                </div>
                                
                            </div>

                            <div>
                                <p className="content_title">► 자격증</p>
                                <div className="career_inform">
                                    <div>
                                        <p className="content_title">2020.10 </p>
                                        <p className="content_title">2020.08 </p>
                                        <p className="content_title">2018.07 </p>
                                    </div>

                                    <div>
                                        <p className="content">컴퓨터활용능력1급</p>
                                        <p className="content">정보처리산업기사</p>
                                        <p className="content">정보처리기능사</p>
                                    </div>
                                    <div></div>
                                </div>
                            </div>

                            <div>
                                <p className="content_title">► 수상경력</p>
                                <div className="career_inform">
                                    <div>
                                        <p className="content_title">2020.11 </p> 
                                    </div>
                                    <div>
                                        <p className="content">AI 음성 데이터 온라인 경진대회 은상</p>
                                    </div>
                                    <div></div>
                                </div>
                            </div>

                            <div>
                                <p className="content_title">► 학력</p>
                                <div className="career_inform">
                                    <div>
                                        <p className="content_title">2021.08 </p> 
                                        <p className="content_title">2016.03 </p>
                                    </div>
                                    <div>
                                        <p className="content">42Seoul 프로그램 참여중</p>
                                        <p className="content">한양대학교 ERICA캠퍼스 재학중</p>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>

            


        );
    }

}
export default Profile;