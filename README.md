# Instalasi

Pastikan Anda telah menginstal Node.js dan MySQL di komputer Anda.
Clone repositori ini ke komputer Anda dengan menjalankan perintah berikut:

```bash
git clone <URL_REPOSITORY>
cd job-portal-app
```

# Menjalankan Server API

Buat database MySQL dengan nama job_listing_db.
Impor file dump MySQL db.sql ke dalam database job_listing_db yang telah dibuat. File dump dapat Anda temukan di direktori db di dalam repositori ini.
Ubah kredensial database MySQL pada file server/app.js dengan mengganti <MYSQL_USERNAME> dan <MYSQL_PASSWORD> dengan kredensial MySQL Anda.
Instal dependensi aplikasi dengan menjalankan perintah berikut di folder root aplikasi:

```bash

npm install

```

Jalankan server API dengan menjalankan perintah berikut di direktori server:

```bash
node app.js
```

server akan berjalan di http://localhost:8080.

# Menjalankan Aplikasi Client (React.js)

Instal dependensi aplikasi dengan menjalankan perintah berikut di folder client aplikasi:

```bash

npm install

```

Jalankan aplikasi client dengan menjalankan perintah berikut di direktori client:

```bash

npm run dev

```

Aplikasi client akan berjalan di http://localhost:5173.
