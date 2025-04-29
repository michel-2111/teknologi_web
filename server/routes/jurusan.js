// Mengimpor Express dan membuat instance router
// yang akan menampung semua rute terkait user
const express = require("express");
const router = express.Router();
// Mengimpor controller yang berisi fungsi-fungsi
// untuk menjalankan logika (ambil data, simpan, edit, hapus).
const jurusanController = require("../controllers/jurusanController");
const multer = require("multer");
const upload = multer(); //berkaitan dengan postman supaya bisa digunakan body >form-data untuk post
//kalau tidak menggunakan multer maka untuk post hanya bisa dengan body>raw>Json
router.get("/", jurusanController.getAllJurusan);
router.get("/:id", jurusanController.getJurusanById);
router.post("/", upload.none(), jurusanController.createJurusan);
router.put("/:id", jurusanController.updateJurusan);
router.delete("/:id", jurusanController.deleteJurusan);

module.exports = router;