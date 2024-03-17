import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import PetsIcon from "@mui/icons-material/Pets";

function Home() {
  return (
    <div className="home-container">
      <span className="pets-icon-container">
        <PetsIcon style={{ fontSize: 100 }} />
      </span>

      <h1 className="home-headline">ERDİ-VET-APP</h1>
      <p className="home-paragraph">
        Uygulama içinde yapabilecekleriniz hakkında kısa bir bilgilendime!
      </p>
      <ul className="home-list">
        <li className="home-list-item">
          Müşteri Yönetimi: Uygulamada müşteri profilleri kolayca
          oluşturulabilir ve yönetilebilir.
        </li>
        <li className="home-list-item">
          Doktor Yönetimi: Veteriner hekimlerin profilleri uygulamaya kolayca
          eklenebilir ve saklanabilir.
        </li>
        <li className="home-list-item">
          Evcil Hayvan Yönetimi: Evcil hayvanların bilgileri uygulamaya kolayca
          eklenebilir ve saklanabilir.
        </li>
        <li className="home-list-item">
          Randevu Yönetimi: Evcil hayvanlar için randevu oluşturulabilir.
        </li>
        <li className="home-list-item">
          Rapor Yazma: Veteriner hekimler, muayene sonuçları hakkındaki
          bilgileri içeren raporlar oluşturabilir.
        </li>
        <li className="home-list-item">
          Aşı Bilgileri: Evcil hayvanların aşı takibi önemlidir. Bu uygulama,
          her bir evcil hayvan için aşı bilgilerini saklar.
        </li>
        <li className="home-list-item">
          Kolay Arama ve Filtreleme: Uygulama, müşterilerin, doktorların,
          hayvanların, randevuların ve raporların hızlıca aranmasını ve
          filtrelenmesini sağlar.
        </li>
      </ul>
      <p className="home-paragraph">
        "Veterinerlik tarih boyunca insanlığın en önemli dostlarına sunduğu
        özenli bakım ile bilinir."
      </p>
      <Link to="/musteri">
        <button className="home-button">Hemen Keşfet!</button>
      </Link>
    </div>
  );
}

export default Home;
