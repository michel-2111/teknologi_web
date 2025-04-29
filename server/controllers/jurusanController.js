const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Ambil semua jurusan beserta relasi prodi dan user
exports.getAllJurusan = async (req, res) => {
  try {
    const jurusanList = await prisma.jurusan.findMany({
      include: {
        prodis: true,
        users: true,
      },
    });
    res.json(jurusanList);
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
      include: {
        prodis: true,
        users: true,
      },
    });

    if (!jurusan) {
      return res.status(404).json({ error: "Jurusan tidak ditemukan." });
    }

    res.json(jurusan);
  } catch (error) {
    console.error("Error fetching jurusan by ID:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data jurusan." });
  }
};

// Tambah jurusan baru
exports.createJurusan = async (req, res) => {
  try {
    const { nama_jurusan, ketua_jurusan } = req.body;

    const newJurusan = await prisma.jurusan.create({
      data: {
        nama_jurusan,
        ketua_jurusan,
      },
    });

    res.status(201).json(newJurusan);
  } catch (error) {
    console.error("Error creating jurusan:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan jurusan." });
  }
};

// Update data jurusan
exports.updateJurusan = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_jurusan, ketua_jurusan } = req.body;

    const updatedJurusan = await prisma.jurusan.update({
      where: { id: parseInt(id) },
      data: {
        nama_jurusan,
        ketua_jurusan,
      },
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
