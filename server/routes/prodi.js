// Mengimpor Express dan membuat instance router
// yang akan menampung semua rute terkait user
const express = require("express");
const router = express.Router();
// Mengimpor controller yang berisi fungsi-fungsi
// untuk menjalankan logika (ambil data, simpan, edit, hapus).
const prodiController = require("../controllers/prodiController");
const multer = require("multer");
const upload = multer(); //berkaitan dengan postman supaya bisa digunakan body >form-data untuk post
//kalau tidak menggunakan multer maka untuk post hanya bisa dengan body>raw>Json
router.get("/", prodiController.getAllProdi);
router.get("/:id", prodiController.getProdiById);
router.post("/", upload.none(), prodiController.createProdi);
router.put("/:id", prodiController.updateProdi);
router.delete("/:id", prodiController.deleteProdi);

module.exports = router;
