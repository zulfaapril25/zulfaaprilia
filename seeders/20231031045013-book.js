'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [{
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      publicationYear: '1937',
      stock: '20',
      price: '250000',
      description: "The Hobbit adalah sebuah kisah petualangan fantasi tentang seorang hobbit bernama Bilbo Baggins yang terlibat dalam misi epik untuk mencari harta karun yang dilindungi oleh naga Smaug. Buku ini menjadi pintu gerbang ke dunia legendaris yang dijelajahi dalam The Lord of the Rings.",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
    title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      publicationYear: '2005',
      stock: '9',
      price: '60000',
      description: "Laskar Pelangi adalah sebuah kisah inspiratif tentang sekelompok anak-anak di Belitung Timur yang berjuang untuk mendapatkan pendidikan yang layak di tengah keterbatasan sumber daya. Buku ini menggambarkan perjuangan, persahabatan, dan semangat mereka dalam menghadapi tantangan hidup.",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
    title: 'Perahu Kertas',
      author: 'Dewi Lestari',
      publicationYear: '2009',
      stock: '15',
      price: '65000',
      description: "Perahu Kertas adalah novel tentang kisah cinta dan petualangan dua remaja, Arai dan Dee, yang memiliki impian besar. Mereka memutuskan untuk mengarungi petualangan hidup dengan perahu kertas sebagai simbol kebebasan dan imajinasi.",
      createdAt: new Date(),
      updatedAt: new Date()
      }, {
    title: 'Laut Bercerita',
      author: 'Leila S. Chudori',
      publicationYear: '2017',
      stock: '15',
      price: '65000',
      description: "Laut Bercerita adalah kisah nyata tentang perilaku kekejaman dan kebengisan yang dirasakan oleh kelompok aktivis mahasiswa di masa Orde Baru. Tidak hanya itu, novel ini pun merenungkan kembali akan hilangnya 13 aktivis, bahkan sampai saat ini belum juga ada yang mendapatkan petunjuknya.",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
    title: 'Autumn in Paris',
      author: 'Ilana Tan ',
      publicationYear: '2015',
      stock: '13',
      price: '80000',
      description: "Autumn in Paris adalah novel yang menceritakan tentang pertemuan antara Ken dan Thea di Paris, Prancis. Novel ini memaparkan kisah cinta mereka, hubungan yang rumit, dan perjalanan mereka dalam menemukan arti cinta sejati.",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
    title: 'Summer in Seoul',
      author: 'Ilana Tan',
      publicationYear: '2013',
      stock: '15',
      price: '75000',
      description: "Perahu Kertas adalah novel yang mengisahkan kisah cinta antara dua karakter utama, Alex dan Anya, yang bertemu di Seoul, Korea Selatan. Novel ini menggambarkan petualangan cinta mereka, perbedaan budaya, dan bagaimana mereka bersama-sama mengatasi berbagai hambatan.",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
    title: 'Bintang',
      author: 'Tere Liye',
      publicationYear: '2009',
      stock: '10',
      price: '70000',
      description: "Bintang adalah novel yang mengisahkan tentang perjalanan seorang anak bernama Donny dalam menghadapi berbagai rintangan dan tantangan dalam hidupnya. Donny memiliki mimpi besar untuk menjadi astronot, dan novel ini menggambarkan perjuangan dan perasaannya dalam mencapai impian tersebut.",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
    title: 'Bumi Manusia',
      author: 'Pramoedya Ananta Toer',
      publicationYear: '1980',
      stock: '12',
      price: '85000',
      description: "Bumi Manusia adalah novel yang mengisahkan tentang  kehidupan Minke, seorang pribumi yang berusaha mendapatkan pendidikan tinggi pada masa penjajahan Belanda di Hindia Belanda.",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
    title: 'Pulang',
      author: 'Tere Liye',
      publicationYear: '2013',
      stock: '5',
      price: '80000',
      description: "Pulang adalah novel yang mengisahkan perjalanan seorang tentara dalam menemukan jati dirinya kembali setelah berperang di luar negeri. Buku ini menggugah banyak pembaca dengan cerita yang penuh emosi.",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  }
};
