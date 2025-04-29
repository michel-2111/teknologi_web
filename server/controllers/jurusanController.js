const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ambil semua jurusan
exports.getAllJurusan = async (req, res) => {
  try {
    const jurusan = await prisma.jurusan.findMany();
    res.json(jurusan);
  } catch (error) {
    console.error("Error fetching jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data jurusan." });
  }
};

// Ambil jurusan berdasarkan ID
exports.getJurusanById = async (req, res) => {
  try {
    const jurusan = await prisma.jurusan.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.json(jurusan);
  } catch (error) {
    console.error("Error fetching jurusan by ID:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data jurusan." });
  }
};

// Tambah jurusan
exports.createJurusan = async (req, res) => {
  try {
    const { nama } = req.body;

    const newJurusan = await prisma.jurusan.create({
      data: { nama },
    });

    res.status(201).json(newJurusan);
  } catch (error) {
    console.error("Error creating jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan jurusan." });
  }
};

// Update jurusan
exports.updateJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama } = req.body;

    const updatedJurusan = await prisma.jurusan.update({
      where: { id: parseInt(id) },
      data: { nama },
    });

    res.json(updatedJurusan);
  } catch (error) {
    console.error("Error updating jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui jurusan." });
  }
};

// Hapus jurusan
exports.deleteJurusan = async (req, res) => {
  try {
    await prisma.jurusan.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.json({ message: "Jurusan berhasil dihapus." });
  } catch (error) {
    console.error("Error deleting jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus jurusan." });
  }
};