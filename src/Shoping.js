import './App.css';
import React from 'react';
import HeaderMenu from './HeaderMenu';
// import styled from 'styled-components';

class Shoping extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isKind: true,
            isEco: "#A879F3",
            isEnergy: "#438F48",
        }
    }

    changeEco = e => {
        console.log("시발");
        this.setState({
            isKind: true
        })
    }

    changeEnergy = () => {
        this.setState({
            isKind: false
        })
    }

    render() {
        return (
            <>
                <HeaderMenu />
                <main>
                    <section id="shoping">
                        <h1 className="nowfruit">광소마 님의 열매는 현재 120개 입니다.</h1>
                        <img src="img/product_inquiry.png" className="btnlookup" />
                        <button className="offbtn" onClick={this.changeEco}>친환경 제품</button>
                        <button className="onbtn" onClick={this.changeEnergy}>에너지 제품</button>



                        {this.state.isKind ? (
                            <div className="test">
                                <div><a href="https://search.shopping.naver.com/catalog/28817388738?cat_id=50004540&frm=NVSCPRO&query=%ED%85%80%EB%B8%94%EB%9F%AC&NaPm=ct%3Dkvt47jog%7Cci%3D05f5c7db7cde474419f7d6357a7646e0ff094374%7Ctr%3Dsls%7Csn%3D95694%7Chk%3D3ca7f891d5ca66d29ff1a94a20e127158592f334" target="_blank"><div className="imgborder"><img src="img/product/tumbler.png" /></div><h2 className="productname">텀블러</h2><p className="price">열매 50개</p></a></div>
                                <div><a href="https://smartstore.naver.com/mrsprincess/products/5513864710?NaPm=ct%3Dkvt4awtk%7Cci%3D24ba0d666d28726e89c41968e75076c1ec915208%7Ctr%3Dslsl%7Csn%3D2146653%7Chk%3D60e1ce8616e7173a7570203f403c89481a5c545c" target="_blank"><div className="imgborder"><img src="img/product/doll.png" /></div><h2 className="productname">인형</h2><p className="price">열매 30개</p></a></div>
                                <div><a href="http://item.gmarket.co.kr/DetailView/Item.asp?goodscode=2164290115&GoodsSale=Y&jaehuid=200001169&NaPm=ct%3Dkwcv9ets%7Cci%3Dcec620e5c1c42cc9fcf4fbe0104b41e2a074d57e%7Ctr%3Dslsc%7Csn%3D24%7Chk%3Debf8bf9e4940b983797b2175a744dc32a70b6558" target="_blank"><div className="imgborder"><img src="img/product/wallet.png" /></div><h2 className="productname">지갑</h2><p className="price">열매 40개</p></a></div>
                                <div><a href="https://smartstore.naver.com/toliving/products/4465434136?NaPm=ct%3Dkwcs08go%7Cci%3D264e10f658340f0c073269f4b393c8f38ca1e9a6%7Ctr%3Dsls%7Csn%3D877430%7Chk%3Df13191fc5d52df3c6724ad127905b55194dcbba1" target="_blank"><div className="imgborder"><img src="img/product/brush.png" /></div><h2 className="productname">칫솔</h2><p className="price">열매 5개</p></a></div>
                            </div>
                        ) : (
                            <div className="test">
                                <div><a href="https://www.11st.co.kr/products/3895914480?NaPm=ct=kwcrtkhs%7Cci=681d210b1cc5da79f906b4f90b55379f5116b0e7%7Ctr=slsl%7Csn=17703%7Chk=da8d609389c5f4786729e3dd07ac4b3e2353b55a&utm_term=&utm_campaign=%B3%D7%C0%CC%B9%F6pc_%B0%A1%B0%DD%BA%F1%B1%B3%B1%E2%BA%BB&utm_source=%B3%D7%C0%CC%B9%F6_PC_PCS&utm_medium=%B0%A1%B0%DD%BA%F1%B1%B3" target="_blank"><div className="imgborder"><img src="img/product/windmill.jpg" /></div><h2 className="productname">풍차만들기 키트</h2><p className="price">열매 10개</p></a></div>
                                <div><a href="https://front.wemakeprice.com/product/1792447462?utm_source=google_ss&utm_medium=cpc&utm_campaign=r_sa" target="_blank"><div className="imgborder"><img src="img/product/WPTK.png" /></div><h2 className="productname">무선전력 전송키트</h2><p className="price">열매 25개</p></a></div>
                                <div><a href="https://front.wemakeprice.com/product/261039379?utm_source=google_ss&utm_medium=cpc&utm_campaign=r_sa" target="_blank"><div className="imgborder"><img src="img/product/carbon_battery.png" /></div><h2 className="productname">탄소전지 만들기</h2><p className="price">열매 25개</p></a></div>
                                <div><a href="https://shopping.interpark.com/product/productInfo.do?prdNo=8712071195&dispNo=016001&bizCd=P01397&NaPm=ct%3Dkwcrrt80%7Cci%3D92c89076ac68af43034cd106fa435d9fdebe71aa%7Ctr%3Dslsl%7Csn%3D3%7Chk%3D694c816453f90dfa4d7dc66aa2e66143341e444a&utm_medium=affiliate&utm_source=naver&utm_campaign=shop_20211015_navershopping_p01397_cps&utm_content=conversion_47" target="_blank"><div className="imgborder"><img src="img/product/solar_panel.png" /></div><h2 className="productname">태양전지판 광에너지</h2><p className="price">열매 25개</p></a></div>
                            </div>
                        )}

                    </section>
                </main>
            </>
        );
    }

}

export default Shoping;