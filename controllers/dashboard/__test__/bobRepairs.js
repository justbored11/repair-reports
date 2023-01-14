const mongoose = require("mongoose");
const mongodb = require("mongodb");
const bobRepairs = [
    {
        _id: "638a22c6dab3fd4a33cf8308",
        title: "Test made by bob edit",
        boardType: "JJ",
        engineMake: "other",
        procedureArr: [
            {
                images: [
                    "http://res.cloudinary.com/da6jwh1id/image/upload/v1669997251/cata/bpfazjxbx1hbmf5sy6ie.jpg",
                ],
                procedureNum: 0,
                instructions: "Bob did edit ",
                thumbs: [
                    "http://res.cloudinary.com/da6jwh1id/image/upload/c_scale,w_400/v1669997251/cata/bpfazjxbx1hbmf5sy6ie.jpg",
                ],
                imagesIdArr: [null],
                _id: "638d197024f21c0fc950cb1d",
            },
        ],
        group: "public",
        visibility: "public",
        createdBy: "63629c7c159bbca8835346f0",
        removed: true,
        __v: 0,
    },
];

module.exports = JSON.stringify(bobRepairs);
