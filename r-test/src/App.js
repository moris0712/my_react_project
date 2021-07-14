import React, { Component, useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock';
import Used_Tool from './components/Used_Tool';
import Profile from './components/Profile';
import Learning from './components/Learning';
import ScrollToTop from './components/ScrollToTop';

import Slider from "react-slick";
import "./slick.css"; 
import "./slick-theme.css";


import main_img1 from './gallery/KakaoTalk_Photo_2021-07-05-12-41-30.jpeg';
import main_img2 from './gallery/KakaoTalk_Photo_2021-07-05-12-41-35.jpeg';
import main_img3 from './gallery/KakaoTalk_Photo_2021-07-05-13-52-06.jpeg';
import main_img4 from './gallery/KakaoTalk_Photo_2021-07-05-12-41-42.jpeg';
import main_img5 from './gallery/KakaoTalk_Photo_2021-07-05-12-41-44.png';
import main_img6 from './gallery/KakaoTalk_Photo_2021-07-05-12-41-47.jpeg';






function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });

    const { current } = domRef;
    observer.observe(current);

    return () => observer.unobserve(current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}




class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time_on: true
    };
    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.current_Time = this.current_Time.bind(this);


    //console.log(this.state.time_on);
  }


  reloadGif = () => {
    this.setState({ loaded: '' })
    setTimeout(() => {
      this.setState({ loaded: this.state.gif })
    }, 0)
  }

  current_Time() {
    this.setState(state => ({
      time_on: !state.time_on
    }));

    //console.log(this.state.time_on);
  }

  render() {

    // 슬라이드 설정
    const settings = { 
      dots: true,  // carousel 밑에 지정 콘텐츠로 바로 이동할 수 있는 버튼을 뜻한다. flase 할시 사라진다.
      infinite: true, // 콘텐츠 끝까지 갔을 때 다음 콘텐츠를 처음 콘텐츠로 가져와 반복한다.
      speed: 500, 
      slidesToShow: 2, // 한 화면에 보이는 콘텐츠 개수
      slidesToScroll: 1, // 한번에 넘어가는 콘텐츠 수
      pauseOnHover: false, // 마우스 호버시 넘어가는거 멈춤
      autoplay: true,
      autoplaySpeed: 2500
    };



    return (
      <div className="App" >
          <div>  
            {/* <FadeInSection>  */}
              <Slider {...settings}>
                <div className="main_img_div">
                  <img className="main_img" src={main_img1} />
                </div>
                <div className="main_img_div">
                  <img className="main_img" src={main_img2} />
                </div>
                <div className="main_img_div">
                  <img className="main_img" src={main_img3} />
                  </div>
                <div className="main_img_div">
                  <img className="main_img" src={main_img4} />
                </div>
                <div className="main_img_div">
                  <img className="main_img" src={main_img5} />
                </div>
                <div className="main_img_div">
                  <img className="main_img" src={main_img6} />
                </div>
              </Slider>

              

              <div id="main_p">
                {/* <p>Am I Doing Well?</p> */}
                <div class="hello">
                  <span>H&nbsp;</span>
                  <span>E&nbsp;</span>
                  <span>L&nbsp;</span>
                  <span>L&nbsp;</span>
                  <span>O&nbsp;</span>
                  <span>!&nbsp;</span>
                </div>

                <div id="symbol">
                  <span> Thank</span>
                  <span> You</span>
                  <span> For</span>
                  <span> Visit</span>
                  <span> Moris' </span>
                  <span> Page</span>
                </div>
              </div>
            {/* </FadeInSection> */}
          </div>
{/* 
        <div className="blank">
          <img src={this.state.loaded} />
        </div> */}


          <div className="blank">
            <hr />
          </div>

        {/* <FadeInSection> */}
          <Profile />
        {/* </FadeInSection> */}

          <div className="blank">
            <hr />
          </div>

        {/* <FadeInSection> */}
          <Learning />
        {/* </FadeInSection> */}

          {/* <button onClick={this.current_Time}>
            현재 시간 {this.state.time_on ? 'ON' : 'OFF'}
          </button>

          { this.state.time_on ? <Clock /> : '' } */}
      </div>
    );
  }

}
export default Main;
