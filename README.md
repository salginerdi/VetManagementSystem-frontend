# Veterinary Management System Frontend

Bu proje, bir veteriner kliniği veya merkezi için geliştirilmiş olan örnek bir yönetim sistemidir. Spring Boot ve katmanlı mimari kullanılarak oluşturulan backend projesinin React.js kullanılarak oluşturulmuş frontend kısmıdır.

Netlify üzerinde canlı olarak görüntülemek için [buraya tıklayın](https://vetsystem.netlify.app).

## Genel Bakış

Vet App Frontend, veterinerlerin ve personelin hayvan sahipleri, randevular, aşı kayıtları, doktorlar ve hayvanlar üzerinde yönetim işlemlerini gerçekleştirebildiği bir platformdur.

## Özellikler

- Hayvan sahibi kaydı
- Hayvan kaydı
- Doktor kaydı
- Doktor müsait günü kaydı
- Randevu kaydı
- Hayvana ait aşı kaydı
- Raporlama İşlemi
- Filtreleme işlemleri (Hayvanlar, Hayvan Sahipleri, Randevular vs.)
- Aşı koruyuculuk kontrolü

## Kullanılan Kütüphaneler

Bu projede aşağıdaki kütüphaneler kullanılmıştır:

- `react-router-dom`: Sayfa yönlendirmeleri ve route'lar için kullanılmıştır.
- `axios`: HTTP istekleri yapmak için kullanılmıştır.
- `material-ui`: Kullanıcı arayüzü bileşenleri için kullanılmıştır.

## Component ve Sayfa Yapısı

Proje, aşağıdaki bileşen ve sayfa yapısını takip etmektedir:

- `components`: Kullanılan genel bileşenler burada bulunmaktadır.
- `pages`: Projenin sayfaları burada bulunmaktadır. Her sayfa, bir veya daha fazla bileşen kullanabilir.

## Kurulum ve Çalıştırma

Projeyi çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. Projeyi klonlayın: `git clone <proje-repository-linki.git>`
2. Gerekli bağımlılıkları yükleyin: `npm install`
3. Projeyi başlatın: `npm run dev`

## Kullanım

Uygulamayı başlattıktan sonra, tarayıcınızda `localhost:5173` adresine giderek uygulamayı kullanabilirsiniz.
----------------------
# Veterinary Management System Frontend

This project is the frontend part of an example management system developed for a veterinary clinic or center. It is built using React.js, complementing the backend project created with Spring Boot and a layered architecture.

To view live on Netlify [click here](https://vetsystem.netlify.app).

## Overview

Vet App Frontend is a platform where veterinarians and staff can manage animal owners, appointments, vaccination records, doctors, and animals.

## Features

- Animal owner registration
- Animal registration
- Doctor registration
- Doctor availability scheduling
- Appointment scheduling
- Vaccination records for animals
- Reporting process
- Filtering operations (Animals, Animal Owners, Appointments, etc.)
- Vaccination protection check

## Libraries Used

The following libraries are used in this project:

- `react-router-dom`: Used for page navigation and routing.
- `axios`: Used for making HTTP requests.
- `material-ui`: Used for user interface components.

## Component and Page Structure

The project follows the following structure for components and pages:

- `components`: General components used throughout the project.
- `pages`: Individual pages of the project. Each page may utilize one or more components.

## Installation and Running the Application

To run the project, follow these steps:

1. Clone the project: `git clone <project-repository-link.git>`
2. Install the necessary dependencies: `npm install`
3. Start the project: `npm run dev`

## Usage

After launching the application, you can use it by visiting `localhost:5173` in your browser.

--------------------------
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
