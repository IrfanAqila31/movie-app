# Dokumentasi Logika Kode Folder `src`

Dokumen ini menjelaskan seluruh kode di dalam folder `src`: setiap folder, setiap file, dan setiap baris penting, diurutkan sesuai alur eksekusi aplikasi dari awal.

Cara membaca:
1. Baca dari atas ke bawah.
2. Setiap file punya penjelasan tujuan, konteks, cuplikan kode, lalu tabel per baris.
3. Kalau ada istilah teknis, artinya dijelaskan di tempat pertama kali muncul, atau di bagian istilah di bawah.

---

## Daftar Isi

1. [Istilah yang sering muncul](#1-istilah-yang-sering-muncul)
2. [Alur kerja aplikasi secara keseluruhan](#2-alur-kerja-aplikasi-secara-keseluruhan)
3. [Struktur folder `src`](#3-struktur-folder-src)
4. [Langkah 1 — Entry point: `main.tsx`](#4-langkah-1--entry-point-maintsx)
5. [Langkah 2 — Style global: `styles/globals.css`](#5-langkah-2--style-global-stylesglobalscss)
6. [Langkah 3 — Root aplikasi: `App.tsx`](#6-langkah-3--root-aplikasi-apptsx)
7. [Langkah 4 — Definisi route: `routes/Route.tsx`](#7-langkah-4--definisi-route-routesroutetsx)
8. [Langkah 5 — Pembuatan router: `routes/index.tsx`](#8-langkah-5--pembuatan-router-routesindextsx)
9. [Langkah 6 — Client API: `services/api.ts`](#9-langkah-6--client-api-servicesapits)
10. [Langkah 7 — Service film: `services/movie.service.ts`](#10-langkah-7--service-film-servicesmovieservicets)
11. [Langkah 8 — Halaman Home](#11-langkah-8--halaman-home)
12. [Langkah 9 — Komponen CardMovie](#12-langkah-9--komponen-cardmovie)
13. [Langkah 10 — Halaman MovieDetail](#13-langkah-10--halaman-moviedetail)
14. [Ringkasan alur data end-to-end](#14-ringkasan-alur-data-end-to-end)

---

## 1. Istilah yang Sering Muncul

| Istilah | Penjelasan |
| --- | --- |
| **Komponen** | Fungsi atau potongan kode React yang mengembalikan UI (JSX). Contoh di project ini: `App`, `Home`, `CardMovie`. |
| **JSX** | Sintaks mirip HTML yang ditulis di dalam JavaScript/TypeScript, misalnya `<App />` atau `<h1>Judul</h1>`. |
| **import** | Mengambil fungsi, komponen, atau nilai dari file/module lain agar bisa dipakai di file saat ini. |
| **export** | Mengekspos fungsi, komponen, atau nilai dari sebuah file agar bisa di-import file lain. |
| **export default** | Satu nilai utama yang diekspor dari file. Saat di-import, namanya boleh diganti. |
| **props** | Data yang dikirim dari komponen induk ke komponen anak melalui atribut JSX, misalnya `<CardMovie title="..." />`. |
| **state / status fetch** | Kondisi data saat aplikasi berjalan, misalnya masih loading, berhasil, atau error. |
| **API** | Endpoint di server yang menyediakan data. Project ini memakai TMDB (The Movie Database). |
| **HTTP request** | Permintaan data ke server, misalnya GET untuk mengambil data. |
| **Axios** | Library JavaScript untuk melakukan HTTP request. |
| **React Query (`@tanstack/react-query`)** | Library untuk mengelola proses fetch data: loading, error, caching, dan penyimpanan hasil. |
| **Router / routing** | Sistem yang menghubungkan URL browser dengan komponen halaman tertentu. |
| **route** | Satu aturan mapping, misalnya path `/` menampilkan komponen `Home`. |
| **async / await** | Pola JavaScript untuk menunggu operasi yang membutuhkan waktu (seperti request ke internet) sebelum melanjutkan baris berikutnya. |
| **TypeScript interface** | Kontrak tipe data. Digunakan supaya props atau objek punya struktur yang jelas dan dicek oleh TypeScript. |
| **environment variable (`.env`)** | Nilai konfigurasi di luar kode, misalnya URL API dan token. Di Vite, yang bisa dipakai di frontend harus berawalan `VITE_`. |
| **barrel file (`index.tsx`)** | File yang hanya meng-import lalu me-re-export komponen, supaya path import lebih pendek. |

---

## 2. Alur Kerja Aplikasi Secara Keseluruhan

Saat kamu menjalankan `npm run dev` dan membuka aplikasi di browser, urutan kerjanya kira-kira seperti ini:

```text
1. Browser memuat index.html
2. index.html memuat /src/main.tsx
3. main.tsx:
   - mengimpor CSS global
   - mengimpor App
   - merender App ke elemen #root
4. App.tsx:
   - membuat QueryClient
   - membungkus aplikasi dengan QueryClientProvider
   - menjalankan RouterProvider dengan objek router
5. Router membaca URL:
   - jika URL = /           → render Home
   - jika URL = /movie/:id  → render MovieDetail
6. Di halaman Home:
   - useQuery memanggil getPopularMovies()
   - getPopularMovies() memakai api (Axios) untuk request ke TMDB
   - data film dikembalikan ke Home
   - Home me-render banyak CardMovie
```

Kenapa urutannya seperti itu?
Karena React tidak langsung “tahu” harus menampilkan apa. Harus ada entry point (`main.tsx`), root provider (`App.tsx`), aturan navigasi (`routes`), lalu baru halaman dan komponen UI yang memakai data dari service/API.

---

## 3. Struktur Folder `src`

| Path | Peran dalam aplikasi |
| --- | --- |
| `main.tsx` | Titik masuk React. Merender root component ke DOM. |
| `App.tsx` | Root component. Menyediakan React Query dan Router ke seluruh aplikasi. |
| `styles/globals.css` | CSS global. Mengaktifkan Tailwind CSS. |
| `routes/Route.tsx` | Definisi daftar route (path + komponen halaman). |
| `routes/index.tsx` | Membuat instance browser router dari daftar route. |
| `services/api.ts` | Instance Axios dengan `baseURL` dan header autentikasi TMDB. |
| `services/movie.service.ts` | Fungsi-fungsi request yang berhubungan dengan data film. |
| `components/pages/Home/` | Halaman daftar film populer. |
| `components/pages/MovieDetail/` | Halaman detail film (masih placeholder). |
| `components/ui/CardMovie/` | Komponen UI untuk menampilkan satu film dalam bentuk kartu. |

Pemisahan folder ini bertujuan supaya tanggung jawab kode jelas:
- `routes` fokus navigasi
- `services` fokus komunikasi API
- `pages` fokus logika halaman
- `ui` fokus tampilan komponen kecil yang bisa dipakai ulang

---

## 4. Langkah 1 — Entry Point: `main.tsx`

### Tujuan file
`main.tsx` adalah file JavaScript/TypeScript pertama yang dijalankan oleh Vite setelah `index.html` memuat script:

```html
<script type="module" src="/src/main.tsx"></script>
```

Tugas utamanya:
1. Mengimpor style global
2. Mengimpor komponen `App`
3. Menemukan elemen HTML `#root`
4. Merender pohon React ke dalam elemen tersebut

Tanpa file ini, komponen React tidak akan pernah muncul di browser.

### Kode lengkap

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import { StrictMode } from "react";` | Mengimpor `StrictMode`, fitur React yang membantu mendeteksi pola bermasalah saat development, misalnya side effect yang tidak aman. Tidak mengubah UI secara visual. |
| 2 | `import { createRoot } from "react-dom/client";` | Mengimpor API modern React untuk membuat root rendering. Ini pengganti pola lama `ReactDOM.render`. |
| 3 | `import "./styles/globals.css";` | Mengimpor CSS global. Efeknya: Tailwind dan style global tersedia di seluruh aplikasi sejak awal. |
| 4 | `import App from "./App.tsx";` | Mengimpor komponen root aplikasi. Semua provider dan routing dimulai dari sini. |
| 6 | `createRoot(document.getElementById("root")!).render(` | `document.getElementById("root")` mencari elemen `<div id="root">` di HTML. Tanda `!` adalah non-null assertion TypeScript: developer menyatakan bahwa elemen itu pasti ada. `createRoot(...).render(...)` menempelkan React ke elemen tersebut. |
| 7 | `<StrictMode>` | Membungkus aplikasi agar React menjalankan pengecekan tambahan di mode development. |
| 8 | `<App />` | Merender komponen `App` sebagai isi utama aplikasi. |
| 9 | `</StrictMode>,` | Menutup wrapper `StrictMode`. |
| 10 | `);` | Menutup pemanggilan `.render(...)`. |

### Poin penting
Setelah baris 6–10 dijalankan, kontrol aplikasi berpindah ke `App.tsx`.

---

## 5. Langkah 2 — Style Global: `styles/globals.css`

### Tujuan folder `styles`
Menyimpan stylesheet yang berlaku secara global, bukan style lokal per komponen.

### Tujuan file `globals.css`
Project ini memakai Tailwind CSS v4. File ini mengaktifkan Tailwind dengan satu perintah import.

### Kode lengkap

```css
@import "tailwindcss";
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `@import "tailwindcss";` | Meminta toolchain Tailwind/Vite untuk memuat utility class Tailwind. Setelah ini, class seperti `flex`, `grid`, `p-4`, `text-center`, `font-bold` bisa dipakai di atribut `className` komponen. |

### Kenapa file ini penting
Jika `globals.css` tidak di-import di `main.tsx`, class Tailwind tetap tertulis di JSX, tetapi tidak menghasilkan style di browser. Tampilan akan terlihat “polos”.

---

## 6. Langkah 3 — Root Aplikasi: `App.tsx`

### Tujuan file
`App.tsx` adalah komponen root. Di sini aplikasi menyiapkan dua infrastruktur yang dipakai hampir semua halaman:

1. **React Query** lewat `QueryClientProvider`  
   Supaya komponen bisa memakai `useQuery` untuk fetch, cache, dan status loading/error.
2. **React Router** lewat `RouterProvider`  
   Supaya URL menentukan halaman mana yang dirender.

### Kenapa dua provider ini ada di `App`
Karena keduanya harus membungkus halaman-halaman di bawahnya. Kalau provider hanya ditaruh di satu halaman, halaman lain tidak bisa memakai fitur yang sama.

### Kode lengkap

```tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import { RouterProvider } from "react-router-dom";` | Mengimpor komponen yang menerima objek router dan menampilkan halaman sesuai URL aktif. |
| 2 | `import { router } from "./routes";` | Mengimpor instance router yang dibuat di `routes/index.tsx`. |
| 3 | `import { QueryClient, QueryClientProvider } from "@tanstack/react-query";` | `QueryClient` adalah objek pengelola cache/fetch. `QueryClientProvider` membuat objek itu tersedia untuk seluruh pohon komponen. |
| 5 | `const queryClient = new QueryClient();` | Membuat satu instance QueryClient untuk aplikasi. Instance ini menyimpan hasil query, status, dan konfigurasi cache. |
| 7 | `const App = () => {` | Mendefinisikan komponen fungsional `App`. |
| 8 | `return (` | Mulai mengembalikan JSX. |
| 9 | `<QueryClientProvider client={queryClient}>` | Memberikan akses React Query ke semua komponen anak. Prop `client` menghubungkan provider ke instance di baris 5. |
| 10 | `<RouterProvider router={router} />` | Menjalankan sistem routing. Komponen ini membaca lokasi browser dan merender elemen route yang cocok. |
| 11 | `</QueryClientProvider>` | Menutup provider React Query. |
| 12 | `);` | Menutup `return`. |
| 13 | `};` | Menutup definisi komponen. |
| 15 | `export default App;` | Mengekspor `App` agar bisa diimpor oleh `main.tsx`. |

### Poin penting
`App.tsx` sendiri tidak menampilkan daftar film. Tanggung jawabnya adalah menyiapkan lingkungan (data fetching + routing) supaya halaman seperti `Home` bisa bekerja.

Urutan wrapper juga penting:
- `QueryClientProvider` di luar
- `RouterProvider` di dalam  

Sehingga semua halaman yang dipilih router tetap berada di dalam konteks React Query.

---

## 7. Langkah 4 — Definisi Route: `routes/Route.tsx`

### Tujuan folder `routes`
Memusatkan konfigurasi navigasi. Dengan begitu, mapping URL ke halaman tidak tersebar di banyak file.

### Tujuan file `Route.tsx`
Mendefinisikan daftar route sebagai data konfigurasi: path apa yang tersedia, dan komponen apa yang dirender untuk path tersebut.

### Kode lengkap

```tsx
import type { RouteObject } from "react-router-dom";
import Home from "../components/pages/Home";
import MovieDetail from "../components/pages/MovieDetail";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
];

export default routes;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import type { RouteObject } from "react-router-dom";` | Mengimpor tipe TypeScript `RouteObject`. Dipakai hanya untuk type-checking, tidak masuk ke runtime bundle. |
| 2 | `import Home from "../components/pages/Home";` | Mengimpor halaman Home melalui barrel file `Home/index.tsx`. |
| 3 | `import MovieDetail from "../components/pages/MovieDetail";` | Mengimpor halaman MovieDetail melalui barrel file-nya. |
| 5 | `const routes: RouteObject[] = [` | Membuat array konfigurasi route. Tipe `RouteObject[]` memastikan tiap item punya bentuk yang valid untuk React Router. |
| 6–9 | `{ path: "/", element: <Home /> }` | Route pertama. Jika URL adalah `/`, React Router merender komponen `Home`. |
| 10–13 | `{ path: "/movie/:id", element: <MovieDetail /> }` | Route kedua. `:id` adalah dynamic segment. Contoh: `/movie/550` membuat parameter `id` bernilai `"550"`. Saat ini parameter itu belum dipakai di `MovieDetail`, tetapi path-nya sudah disiapkan. |
| 16 | `export default routes;` | Mengekspor array route agar bisa dipakai oleh `routes/index.tsx`. |

### Contoh perilaku

| URL yang dibuka | Komponen yang dirender |
| --- | --- |
| `/` | `Home` |
| `/movie/123` | `MovieDetail` |
| `/movie/abc` | `MovieDetail` (karena `:id` menerima segmen apa pun; validasi belum ditambahkan) |

---

## 8. Langkah 5 — Pembuatan Router: `routes/index.tsx`

### Tujuan file
`Route.tsx` hanya berisi data konfigurasi. File ini mengubah data itu menjadi objek router yang bisa dipakai `RouterProvider`.

### Perbedaan peran dua file route

| File | Peran |
| --- | --- |
| `Route.tsx` | Menulis daftar path dan elemen halaman |
| `index.tsx` | Membuat router aktif dari daftar tersebut |

### Kode lengkap

```tsx
import { createBrowserRouter } from "react-router-dom";
import routes from "./Route";

export const router = createBrowserRouter(routes);
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import { createBrowserRouter } from "react-router-dom";` | Mengimpor factory function untuk membuat router berbasis History API browser. URL-nya bersih (tanpa hash `#`). |
| 3 | `import routes from "./Route";` | Mengimpor array konfigurasi route. |
| 5 | `export const router = createBrowserRouter(routes);` | Membuat instance router, lalu mengekspornya sebagai named export. `App.tsx` mengimpor `{ router }` dari sini. |

### Poin penting
Saat `App` merender `<RouterProvider router={router} />`, React Router mulai:
1. Membaca lokasi browser saat ini
2. Mencocokkan path dengan daftar route
3. Merender `element` yang sesuai

---

## 9. Langkah 6 — Client API: `services/api.ts`

### Tujuan folder `services`
Memisahkan logika komunikasi jaringan dari komponen UI. Komponen fokus ke tampilan dan state halaman; service fokus ke request HTTP.

### Tujuan file `api.ts`
Membuat satu instance Axios yang sudah dikonfigurasi dengan:
- `baseURL` TMDB
- header `Authorization` (token)
- header `Accept` (format respons)

Dengan begitu, setiap service tidak perlu mengulang konfigurasi yang sama.

### Kode lengkap

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import axios from "axios";` | Mengimpor library Axios. |
| 3 | `export const api = axios.create({` | Membuat instance Axios khusus project ini, lalu mengekspornya agar bisa dipakai service lain. |
| 4 | `baseURL: import.meta.env.VITE_TMDB_BASE_URL,` | Menetapkan URL dasar API dari environment variable Vite. Contoh nilai: `https://api.themoviedb.org/3`. Request relatif seperti `/movie/popular` akan digabung ke base URL ini. |
| 5 | `headers: {` | Memulai objek header default. Header ini otomatis ikut di setiap request yang memakai instance `api`. |
| 6 | `Authorization: \`Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}\`,` | Menyisipkan access token TMDB. Format `Bearer <token>` adalah cara umum autentikasi API. Tanpa token yang valid, request biasanya ditolak. |
| 7 | `Accept: "application/json",` | Memberitahu server bahwa client mengharapkan respons JSON. |
| 8 | `},` | Menutup objek `headers`. |
| 9 | `});` | Menutup `axios.create(...)`. |

### Tentang `import.meta.env`
Ini cara Vite membaca environment variable.
- Variabel harus ada di file `.env` (atau `.env.local`, dll.)
- Nama yang ingin dipakai di kode frontend harus diawali `VITE_`
- Jangan menaruh secret yang benar-benar sensitif di frontend jika bisa dihindari; token TMDB di client-side memang umum untuk project belajar, tetapi perlu dipahami risikonya

### Poin penting
File ini belum melakukan request apa pun. Dia hanya menyiapkan “client HTTP” yang siap dipakai.

---

## 10. Langkah 7 — Service Film: `services/movie.service.ts`

### Tujuan file
Menyediakan fungsi bisnis untuk mengambil data film. Halaman tidak memanggil Axios secara langsung; halaman memanggil fungsi service.

Pola ini membuat kode lebih rapi:
- kalau endpoint berubah, cukup ubah di service
- kalau ingin menambah endpoint baru (misalnya detail film), tempatnya sudah jelas

### Kode lengkap

```ts
import { api } from "./api";

export const getPopularMovies = async () => {
  const response = await api.get("/movie/popular?language=id-ID&page=1");
  return response.data.results;
};
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import { api } from "./api";` | Mengimpor instance Axios yang sudah berisi base URL dan token. |
| 3 | `export const getPopularMovies = async () => {` | Mendefinisikan fungsi asynchronous bernama `getPopularMovies`, lalu mengekspornya. Kata `async` diperlukan karena di dalamnya ada `await`. |
| 4 | `const response = await api.get("/movie/popular?language=id-ID&page=1");` | Mengirim HTTP GET ke endpoint film populer TMDB. Query string: `language=id-ID` meminta konten berbahasa Indonesia (jika tersedia), `page=1` mengambil halaman pertama. `await` menunggu respons selesai sebelum lanjut. |
| 5 | `return response.data.results;` | Axios membungkus respons HTTP di objek `response`. Isi body JSON ada di `response.data`. TMDB mengembalikan objek yang berisi field `results` (array film). Fungsi ini hanya mengembalikan array itu, bukan seluruh objek respons. |
| 6 | `};` | Menutup fungsi. |

### Bentuk data yang dikembalikan
Secara konsep, hasilnya berupa array objek seperti ini:

```ts
[
  {
    id: 123,
    title: "Judul Film",
    poster_path: "/abcdef.jpg",
    release_date: "2024-01-15",
    vote_average: 8.4,
    // field lain dari TMDB juga ada, tetapi Home hanya memakai sebagian
  }
]
```

Array inilah yang nanti masuk ke variabel `data` di `useQuery` pada halaman Home.

---

## 11. Langkah 8 — Halaman Home

Folder: `components/pages/Home/`

| File | Fungsi |
| --- | --- |
| `index.tsx` | Barrel file / re-export |
| `Home.tsx` | Logika fetch + tampilan daftar film |

---

### 11.1 `components/pages/Home/index.tsx`

### Tujuan file
Menyederhanakan path import. Dengan file ini, file lain cukup menulis:

```ts
import Home from "../components/pages/Home";
```

bukan:

```ts
import Home from "../components/pages/Home/Home";
```

### Kode lengkap

```tsx
import Home from "./Home";
export default Home;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import Home from "./Home";` | Mengimpor default export dari `Home.tsx`. |
| 2 | `export default Home;` | Mengekspor ulang komponen yang sama sebagai default export folder `Home`. |

---

### 11.2 `components/pages/Home/Home.tsx`

### Tujuan file
Ini halaman utama aplikasi. Tanggung jawabnya:

1. Meminta data film populer lewat React Query
2. Menampilkan UI loading saat request belum selesai
3. Menampilkan UI error saat request gagal
4. Menampilkan grid kartu film saat data berhasil didapat

### Alur di dalam komponen

```text
Komponen Home di-render
        ↓
useQuery dijalankan
        ↓
queryFn = getPopularMovies
        ↓
request ke TMDB lewat api.ts
        ↓
┌──────────────┬──────────────┬──────────────┐
│ isLoading    │ isError      │ sukses       │
│ tampil teks  │ tampil teks  │ tampil grid  │
│ Loading...   │ Gagal...     │ CardMovie    │
└──────────────┴──────────────┴──────────────┘
```

### Kode lengkap

```tsx
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../../../services/movie.service";
import CardMovie from "../../ui/CardMovie";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular-movie"],
    queryFn: getPopularMovies,
  });
  if (isLoading) {
    return <h1 className="text-center mt-10">Loading Film...</h1>;
  }
  if (isError) {
    return <h1 className="text-center mt-10">Gagal Memuat Film</h1>;
  }
  return (
    <section className="container mx-auto p-4 min-h-screen">
      <main>
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Film Populer Saat Ini
          </h1>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {data.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </main>
    </section>
  );
};
export default Home;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import { useQuery } from "@tanstack/react-query";` | Mengimpor hook `useQuery` untuk fetch data, caching, dan status request. |
| 2 | `import { getPopularMovies } from "../../../services/movie.service";` | Mengimpor fungsi service yang melakukan request ke endpoint film populer. |
| 3 | `import CardMovie from "../../ui/CardMovie";` | Mengimpor komponen kartu film untuk ditampilkan di grid. |
| 5 | `const Home = () => {` | Mendefinisikan komponen halaman Home. |
| 6 | `const { data, isLoading, isError } = useQuery({` | Menjalankan query dan mendestruktur tiga nilai penting: `data` (hasil), `isLoading` (masih fetch), `isError` (gagal). |
| 7 | `queryKey: ["popular-movie"],` | Kunci unik cache. React Query menyimpan hasil fetch berdasarkan key ini. Jika komponen lain memakai key yang sama, mereka bisa berbagi cache. |
| 8 | `queryFn: getPopularMovies,` | Fungsi yang dipanggil untuk mengambil data. Harus mengembalikan Promise (fungsi async sudah memenuhi syarat ini). |
| 9 | `});` | Menutup konfigurasi `useQuery`. |
| 10–12 | `if (isLoading) { return ...Loading Film... }` | Early return: selama data belum siap, komponen hanya menampilkan pesan loading. Ini mencegah error seperti memanggil `.map` pada `data` yang masih `undefined`. |
| 13–15 | `if (isError) { return ...Gagal Memuat Film }` | Early return untuk kondisi gagal, misalnya token salah, jaringan putus, atau server error. |
| 16 | `return (` | Jika tidak loading dan tidak error, lanjut render tampilan utama. |
| 17 | `<section className="container mx-auto p-4 min-h-screen">` | Container halaman. `container mx-auto` membatasi lebar dan menengahkan layout. `p-4` memberi padding. `min-h-screen` membuat tinggi minimal satu viewport. |
| 18 | `<main>` | Elemen semantik untuk konten utama. |
| 19–23 | `<header> ... Film Populer Saat Ini` | Judul halaman. |
| 24 | `<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">` | Grid responsif: 2 kolom di layar kecil, 3 di `md`, 5 di `lg`, dengan jarak antar item `gap-6`. |
| 25 | `{data.map((movie) => (` | Mengiterasi array film. Setiap elemen `movie` dipakai untuk membuat satu `CardMovie`. |
| 26 | `<CardMovie` | Mulai merender komponen kartu. |
| 27 | `key={movie.id}` | Key React untuk list. Membantu React mengidentifikasi item saat list berubah/re-render. Biasanya memakai id unik dari data. |
| 28 | `id={movie.id}` | Mengirim id film sebagai props. Saat ini `CardMovie` menerima `id` di tipenya, tetapi belum memakai `id` di dalam UI. |
| 29 | `title={movie.title}` | Mengirim judul film. |
| 30 | `poster_path={movie.poster_path}` | Mengirim path poster dari TMDB. |
| 31 | `release_date={movie.release_date}` | Mengirim tanggal rilis. |
| 32 | `vote_average={movie.vote_average}` | Mengirim rating rata-rata. |
| 33 | `/>` | Menutup tag `CardMovie`. |
| 34 | `))}` | Menutup `map`. |
| 35–38 | penutup tag + `);` | Menutup struktur JSX dan `return`. |
| 39 | `};` | Menutup komponen. |
| 40 | `export default Home;` | Mengekspor Home agar bisa dipakai route dan `index.tsx`. |

### Poin penting tentang typing `data`
Di kode saat ini, `data` tidak diberi tipe eksplisit. Setelah lolos pengecekan `isLoading` dan `isError`, kode mengasumsikan `data` sudah tersedia dan berbentuk array. Untuk tahap belajar ini biasanya cukup, tetapi ke depan sebaiknya ditambahkan tipe hasil API agar lebih aman.

---

## 12. Langkah 9 — Komponen CardMovie

Folder: `components/ui/CardMovie/`

| File | Fungsi |
| --- | --- |
| `index.tsx` | Barrel file / re-export |
| `CardMovie.tsx` | UI kartu untuk satu film |

---

### 12.1 `components/ui/CardMovie/index.tsx`

### Tujuan file
Sama seperti barrel file Home: mempersingkat path import.

### Kode lengkap

```tsx
import CardMovie from "./CardMovie";
export default CardMovie;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import CardMovie from "./CardMovie";` | Mengimpor komponen dari `CardMovie.tsx`. |
| 2 | `export default CardMovie;` | Mengekspor ulang sebagai default export folder. |

---

### 12.2 `components/ui/CardMovie/CardMovie.tsx`

### Tujuan file
Menampilkan ringkasan satu film: poster, judul, tahun rilis, dan rating.

Komponen ini bersifat presentational:
- tidak memanggil API
- tidak tahu dari mana datanya berasal
- hanya menerima props dan merender UI

Pemisahan ini membuat `CardMovie` mudah dipakai ulang di halaman lain nanti.

### Kode lengkap

```tsx
interface CardMovieProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const CardMovie = ({
  title,
  poster_path,
  release_date,
  vote_average,
}: CardMovieProps) => {
  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={imageUrl} alt={title} className="w-full h-87 object-cover" />
      <div className="p-4">
        <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
          {title}
        </h2>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>{release_date ? release_date.substring(0, 4) : ""}</span>
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
            {vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
};

export default CardMovie;
```

### Penjelasan per baris

#### A. Definisi props

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `interface CardMovieProps {` | Membuat kontrak TypeScript untuk props komponen. |
| 2 | `id: number;` | ID film. Saat ini belum dipakai di JSX, tetapi sudah didefinisikan (berguna nanti untuk link ke detail). |
| 3 | `title: string;` | Judul film. |
| 4 | `poster_path: string;` | Path relatif poster dari TMDB, biasanya diawali `/`. |
| 5 | `release_date: string;` | Tanggal rilis, umumnya format `YYYY-MM-DD`. |
| 6 | `vote_average: number;` | Skor rating rata-rata. |
| 7 | `}` | Menutup interface. |

#### B. Destructuring props dan penyusunan URL gambar

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 9–14 | `const CardMovie = ({ title, poster_path, release_date, vote_average }: CardMovieProps) => {` | Mendefinisikan komponen dan langsung mengambil field yang dibutuhkan dari props. `id` ada di interface, tetapi tidak di-destructure karena belum dipakai. |
| 15–17 | `const imageUrl = poster_path ? \`https://image.tmdb.org/t/p/w500${poster_path}\` : "https://via.placeholder.com/..."` | TMDB tidak mengirim URL gambar penuh di `poster_path`, hanya path-nya. Kode ini menyusun URL lengkap dengan ukuran `w500`. Jika `poster_path` kosong/falsy, dipakai gambar placeholder agar UI tidak rusak. |

Contoh penyusunan URL:
- `poster_path = "/abc123.jpg"`
- `imageUrl = "https://image.tmdb.org/t/p/w500/abc123.jpg"`

#### C. Render UI

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 20 | `<article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">` | Elemen kartu. Style: background putih, sudut membulat, bayangan, `overflow-hidden` supaya gambar tidak keluar dari sudut membulat, dan bayangan lebih kuat saat hover dengan transisi 300ms. |
| 21 | `<img src={imageUrl} alt={title} className="w-full h-87 object-cover" />` | Menampilkan poster. `alt={title}` penting untuk aksesibilitas. `object-cover` membuat gambar mengisi area tanpa terdistorsi secara berlebihan. |
| 22 | `<div className="p-4">` | Area konten teks di bawah poster. |
| 23–25 | `<h2 ...>{title}</h2>` | Menampilkan judul. `line-clamp-1` memotong teks menjadi maksimal 1 baris jika terlalu panjang. |
| 26 | `<div className="flex justify-between items-center mt-2 text-sm text-gray-500">` | Baris meta informasi: tahun di kiri, rating di kanan. |
| 27 | `{release_date ? release_date.substring(0, 4) : ""}` | Mengambil 4 karakter pertama tanggal, yaitu tahun. Jika `release_date` kosong, menampilkan string kosong. |
| 28–30 | badge rating + `vote_average.toFixed(1)` | Menampilkan rating dengan 1 angka di belakang koma. Contoh: `8.543` menjadi `"8.5"`. |
| 31–34 | penutup elemen | Menutup struktur JSX. |
| 35 | `};` | Menutup komponen. |
| 37 | `export default CardMovie;` | Mengekspor komponen. |

### Poin penting
Jika nanti kartu ingin bisa diklik menuju halaman detail, biasanya `id` dipakai untuk membuat link ke `/movie/${id}`. Saat ini fitur itu belum diimplementasikan.

---

## 13. Langkah 10 — Halaman MovieDetail

Folder: `components/pages/MovieDetail/`

| File | Fungsi |
| --- | --- |
| `index.tsx` | Barrel file / re-export |
| `MovieDetail.tsx` | Halaman detail film |

### Status saat ini
Route `/movie/:id` sudah terdaftar, tetapi halaman detail masih placeholder. Belum ada:
- pembacaan parameter `id` dari URL
- request detail film ke API
- tampilan sinopsis/poster detail

---

### 13.1 `components/pages/MovieDetail/index.tsx`

### Kode lengkap

```tsx
import MovieDetail from "./MovieDetail";
export default MovieDetail;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `import MovieDetail from "./MovieDetail";` | Mengimpor komponen dari `MovieDetail.tsx`. |
| 2 | `export default MovieDetail;` | Mengekspor ulang sebagai default export folder. |

---

### 13.2 `components/pages/MovieDetail/MovieDetail.tsx`

### Tujuan file saat ini
Menyediakan komponen halaman yang bisa dirender oleh router. Isinya masih teks sementara.

### Kode lengkap

```tsx
const MovieDetail = () => {
  return (
    <div>
      <h1>ini halaman Movie Detail</h1>
    </div>
  );
};
export default MovieDetail;
```

### Penjelasan per baris

| Baris | Kode | Penjelasan detail |
| --- | --- | --- |
| 1 | `const MovieDetail = () => {` | Mendefinisikan komponen halaman detail tanpa props. |
| 2–6 | `return (<div><h1>ini halaman Movie Detail</h1></div>)` | Merender placeholder sederhana untuk menandai bahwa route detail sudah aktif. |
| 7 | `};` | Menutup komponen. |
| 8 | `export default MovieDetail;` | Mengekspor komponen agar bisa dipakai route dan `index.tsx`. |

### Arah pengembangan yang umum (belum ada di kode)
Untuk melengkapi halaman ini biasanya dibutuhkan:
1. `useParams()` dari React Router untuk membaca `id`
2. fungsi service baru, misalnya `getMovieById(id)`
3. `useQuery` di `MovieDetail` untuk fetch detail
4. UI untuk menampilkan poster, overview, genre, rating, dll.

Dokumen ini sengaja memisahkan “yang sudah ada” dan “yang belum ada” supaya tidak membingungkan.

---

## 14. Ringkasan Alur Data End-to-End

### Urutan file berdasarkan eksekusi

| Urutan | File | Tanggung jawab |
| --- | --- | --- |
| 1 | `main.tsx` | Bootstrap React ke `#root`, muat CSS, render `App` |
| 2 | `styles/globals.css` | Aktifkan Tailwind |
| 3 | `App.tsx` | Sediakan React Query + Router |
| 4 | `routes/Route.tsx` | Definisikan mapping URL → halaman |
| 5 | `routes/index.tsx` | Buat instance `router` |
| 6 | `Home.tsx` | Fetch daftar film + render UI halaman |
| 7 | `movie.service.ts` | Panggil endpoint film populer |
| 8 | `api.ts` | Kirim HTTP request ke TMDB dengan token |
| 9 | `CardMovie.tsx` | Tampilkan satu item film |
| 10 | `MovieDetail.tsx` | Placeholder route detail |

### Alur data saat user membuka `/`

```text
Browser URL: /
        ↓
Router memilih element <Home />
        ↓
Home menjalankan useQuery({
  queryKey: ["popular-movie"],
  queryFn: getPopularMovies
})
        ↓
getPopularMovies()
        ↓
api.get("/movie/popular?language=id-ID&page=1")
        ↓
TMDB mengembalikan JSON
        ↓
service mengembalikan response.data.results
        ↓
useQuery mengisi data / isLoading / isError
        ↓
Home:
  - loading → teks loading
  - error   → teks gagal
  - sukses  → data.map(...) → CardMovie
```

### Hubungan antar lapisan

```text
pages (Home, MovieDetail)
   memakai
ui components (CardMovie)
   dan
services (movie.service.ts)
   memakai
api client (api.ts / Axios)
   request ke
TMDB API
```

### Cara mempelajari kode ini secara efektif
1. Mulai dari `main.tsx` dan `App.tsx` untuk paham bootstrap.
2. Lanjut ke `routes` untuk paham kenapa halaman tertentu muncul.
3. Baca `Home.tsx` untuk paham siklus loading → error → sukses.
4. Telusuri `movie.service.ts` dan `api.ts` untuk paham asal data.
5. Akhiri di `CardMovie.tsx` untuk paham bagaimana data ditampilkan.

Kalau ada bagian tertentu yang masih kurang jelas (misalnya `useQuery`, dynamic route `:id`, atau penyusunan `imageUrl`), sebutkan bagiannya dan bisa dijelaskan lebih dalam lagi dengan contoh alur nilai data dari request sampai ke layar.
