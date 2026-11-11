// Actualización parcial cargada desde la planilla del 11/11/2026.
// Los alimentos marcados se presentan como packs de 2, sin alterar el precio unitario.
(function applyCatalogUpdate(){
  const changes = [
  {
    "id": "76",
    "price": 1900,
    "twoForEnabled": true,
    "boxQuantity": 10,
    "boxUnitPrice": 1805,
    "boxPrice": 18050
  },
  {
    "id": "77",
    "price": 1700,
    "twoForEnabled": true,
    "boxQuantity": 10,
    "boxUnitPrice": 1615,
    "boxPrice": 16150
  },
  {
    "id": "69",
    "price": 5890,
    "twoForEnabled": true,
    "boxQuantity": 3,
    "boxUnitPrice": 5500,
    "boxPrice": 16500
  },
  {
    "id": "70",
    "price": 16050,
    "twoForEnabled": false,
    "boxQuantity": 3,
    "boxUnitPrice": 15100,
    "boxPrice": 45300
  },
  {
    "id": "74",
    "price": 15000,
    "twoForEnabled": false,
    "boxQuantity": 3,
    "boxUnitPrice": 14110,
    "boxPrice": 42330
  },
  {
    "id": "72",
    "price": 1410,
    "twoForEnabled": true
  },
  {
    "id": "73",
    "price": 2610,
    "twoForEnabled": true,
    "boxQuantity": 6,
    "boxUnitPrice": 2300,
    "boxPrice": 13800
  },
  {
    "id": "75",
    "price": 1900,
    "twoForEnabled": true,
    "boxQuantity": 8,
    "boxUnitPrice": 1670,
    "boxPrice": 13360
  },
  {
    "id": "71",
    "price": 1880,
    "twoForEnabled": true
  },
  {
    "id": "68",
    "price": 890,
    "twoForEnabled": false
  },
  {
    "id": "85",
    "price": 2000,
    "twoForEnabled": true
  },
  {
    "id": "43",
    "price": 2000,
    "twoForEnabled": true
  },
  {
    "id": "86",
    "price": 1550,
    "twoForEnabled": true
  },
  {
    "id": "83",
    "price": 3500,
    "twoForEnabled": true
  },
  {
    "id": "84",
    "price": 3500,
    "twoForEnabled": true
  },
  {
    "id": "82",
    "price": 2500,
    "twoForEnabled": true
  },
  {
    "id": "88",
    "price": 10560,
    "twoForEnabled": true
  },
  {
    "id": "87",
    "price": 10205,
    "twoForEnabled": true
  },
  {
    "id": "42",
    "price": 15990,
    "twoForEnabled": false
  },
  {
    "id": "89",
    "price": 31100,
    "twoForEnabled": false
  },
  {
    "id": "93",
    "price": 21590,
    "twoForEnabled": false
  },
  {
    "id": "90",
    "price": 5790,
    "twoForEnabled": false
  },
  {
    "id": "95",
    "price": 21590,
    "twoForEnabled": false
  },
  {
    "id": "92",
    "price": 5790,
    "twoForEnabled": false
  },
  {
    "id": "94",
    "price": 26590,
    "twoForEnabled": false
  },
  {
    "id": "91",
    "price": 7190,
    "twoForEnabled": false
  },
  {
    "id": "114",
    "price": 1400,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 1250,
    "boxPrice": 15000
  },
  {
    "id": "113",
    "price": 1400,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 1250,
    "boxPrice": 15000
  },
  {
    "id": "320",
    "price": 7230,
    "twoForEnabled": true,
    "boxQuantity": 6,
    "boxUnitPrice": 6390,
    "boxPrice": 38340
  },
  {
    "id": "49",
    "price": 720,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 640,
    "boxPrice": 7680
  },
  {
    "id": "50",
    "price": 720,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 640,
    "boxPrice": 7680
  },
  {
    "id": "47",
    "price": 1050,
    "twoForEnabled": true
  },
  {
    "id": "120",
    "price": 660,
    "twoForEnabled": true
  },
  {
    "id": "119",
    "price": 660,
    "twoForEnabled": true
  },
  {
    "id": "112",
    "price": 1000,
    "twoForEnabled": true
  },
  {
    "id": "48",
    "price": 1050,
    "twoForEnabled": true
  },
  {
    "id": "115",
    "price": 860,
    "twoForEnabled": true
  },
  {
    "id": "116",
    "price": 860,
    "twoForEnabled": true
  },
  {
    "id": "118",
    "price": 350,
    "twoForEnabled": true
  },
  {
    "id": "117",
    "price": 350,
    "twoForEnabled": true
  },
  {
    "id": "122",
    "price": 2025,
    "twoForEnabled": true
  },
  {
    "id": "123",
    "price": 2025,
    "twoForEnabled": true
  },
  {
    "id": "121",
    "price": 375,
    "twoForEnabled": true
  },
  {
    "id": "106",
    "price": 5000,
    "twoForEnabled": true
  },
  {
    "id": "105",
    "price": 1110,
    "twoForEnabled": true
  },
  {
    "id": "109",
    "price": 1450,
    "twoForEnabled": true
  },
  {
    "id": "108",
    "price": 1790,
    "twoForEnabled": true
  },
  {
    "id": "110",
    "price": 1460,
    "twoForEnabled": true
  },
  {
    "id": "107",
    "price": 1790,
    "twoForEnabled": true
  },
  {
    "id": "111",
    "price": 1850,
    "twoForEnabled": true
  },
  {
    "id": "148",
    "price": 2550,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 2400,
    "boxPrice": 28800
  },
  {
    "id": "404",
    "price": 55000,
    "twoForEnabled": false
  },
  {
    "id": "153",
    "price": 1900,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 1790,
    "boxPrice": 21480
  },
  {
    "id": "147",
    "price": 2900,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 2690,
    "boxPrice": 32280
  },
  {
    "id": "143",
    "price": 2010,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 1790,
    "boxPrice": 21480
  },
  {
    "id": "142",
    "price": 2010,
    "twoForEnabled": true,
    "boxQuantity": 12,
    "boxUnitPrice": 1790,
    "boxPrice": 21480
  },
  {
    "id": "149",
    "price": 1330,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 1190,
    "boxPrice": 23800
  },
  {
    "id": "151",
    "price": 1050,
    "twoForEnabled": true
  },
  {
    "id": "150",
    "price": 1050,
    "twoForEnabled": true
  },
  {
    "id": "487",
    "price": 2390,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 2130,
    "boxPrice": 42600
  },
  {
    "id": "145",
    "price": 2080,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 1850,
    "boxPrice": 37000
  },
  {
    "id": "146",
    "price": 2080,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 185,
    "boxPrice": 3700
  },
  {
    "id": "144",
    "price": 2080,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 1850,
    "boxPrice": 37000
  },
  {
    "id": "489",
    "price": 1910,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 1700,
    "boxPrice": 34000
  },
  {
    "id": "488",
    "price": 1910,
    "twoForEnabled": true,
    "boxQuantity": 20,
    "boxUnitPrice": 1700,
    "boxPrice": 34000
  },
  {
    "id": "138",
    "price": 1450,
    "twoForEnabled": true
  },
  {
    "id": "139",
    "price": 1450,
    "twoForEnabled": true
  },
  {
    "id": "140",
    "price": 1800,
    "twoForEnabled": true
  },
  {
    "id": "141",
    "price": 1800,
    "twoForEnabled": true
  },
  {
    "id": "66",
    "price": 1150,
    "twoForEnabled": true
  },
  {
    "id": "67",
    "price": 1150,
    "twoForEnabled": true
  },
  {
    "id": "64",
    "price": 1610,
    "twoForEnabled": true
  },
  {
    "id": "65",
    "price": 2560,
    "twoForEnabled": true
  },
  {
    "id": "58",
    "price": 1700,
    "twoForEnabled": true
  },
  {
    "id": "55",
    "price": 1400,
    "twoForEnabled": true
  },
  {
    "id": "52",
    "price": 1600,
    "twoForEnabled": true
  },
  {
    "id": "53",
    "price": 1600,
    "twoForEnabled": true
  },
  {
    "id": "51",
    "price": 1600,
    "twoForEnabled": true
  },
  {
    "id": "54",
    "price": 1200,
    "twoForEnabled": true
  },
  {
    "id": "57",
    "price": 1200,
    "twoForEnabled": true
  },
  {
    "id": "56",
    "price": 1200,
    "twoForEnabled": true
  },
  {
    "id": "362",
    "price": 4000,
    "twoForEnabled": true
  },
  {
    "id": "363",
    "price": 4000,
    "twoForEnabled": true
  },
  {
    "id": "365",
    "price": 690,
    "twoForEnabled": true
  },
  {
    "id": "364",
    "price": 1690,
    "twoForEnabled": true
  },
  {
    "id": "371",
    "price": 1100,
    "twoForEnabled": true
  },
  {
    "id": "374",
    "price": 1100,
    "twoForEnabled": true
  },
  {
    "id": "372",
    "price": 1100,
    "twoForEnabled": true
  },
  {
    "id": "373",
    "price": 1100,
    "twoForEnabled": true
  },
  {
    "id": "370",
    "price": 1350,
    "twoForEnabled": true
  },
  {
    "id": "369",
    "price": 1350,
    "twoForEnabled": true
  },
  {
    "id": "366",
    "price": 1350,
    "twoForEnabled": true
  },
  {
    "id": "367",
    "price": 1350,
    "twoForEnabled": true
  },
  {
    "id": "368",
    "price": 1350,
    "twoForEnabled": true
  },
  {
    "id": "44",
    "price": 2250,
    "twoForEnabled": true
  },
  {
    "id": "346",
    "price": 1200,
    "twoForEnabled": true,
    "boxQuantity": 10,
    "boxUnitPrice": 1160,
    "boxPrice": 11600
  },
  {
    "id": "357",
    "price": 4990,
    "twoForEnabled": false
  },
  {
    "id": "358",
    "price": 4990,
    "twoForEnabled": false
  },
  {
    "id": "356",
    "price": 8990,
    "twoForEnabled": false
  },
  {
    "id": "103",
    "price": 900,
    "twoForEnabled": true
  },
  {
    "id": "102",
    "price": 1000,
    "twoForEnabled": true
  },
  {
    "id": "104",
    "price": 1050,
    "twoForEnabled": true
  },
  {
    "id": "80",
    "price": 500,
    "twoForEnabled": true
  },
  {
    "id": "81",
    "price": 500,
    "twoForEnabled": true
  },
  {
    "id": "79",
    "price": 16500,
    "twoForEnabled": false
  },
  {
    "id": "497",
    "price": 1000,
    "twoForEnabled": true
  },
  {
    "id": "402",
    "price": 1600,
    "twoForEnabled": true
  },
  {
    "id": "401",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "391",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "389",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "397",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "396",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "390",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "393",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "392",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "400",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "398",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "395",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "399",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "394",
    "price": 2350,
    "twoForEnabled": true
  },
  {
    "id": "37",
    "price": 46550,
    "twoForEnabled": false
  },
  {
    "id": "36",
    "price": 1600,
    "twoForEnabled": true
  },
  {
    "id": "136",
    "price": 46550,
    "twoForEnabled": false
  },
  {
    "id": "128",
    "price": 35085,
    "twoForEnabled": false
  },
  {
    "id": "135",
    "price": 19860,
    "twoForEnabled": false
  },
  {
    "id": "133",
    "price": 18650,
    "twoForEnabled": false
  },
  {
    "id": "129",
    "price": 32800,
    "twoForEnabled": false
  },
  {
    "id": "124",
    "price": 53500,
    "twoForEnabled": false
  },
  {
    "id": "132",
    "price": 30420,
    "twoForEnabled": false
  },
  {
    "id": "131",
    "price": 86800,
    "twoForEnabled": false
  },
  {
    "id": "130",
    "price": 39710,
    "twoForEnabled": false
  },
  {
    "id": "126",
    "price": 79200,
    "twoForEnabled": false
  },
  {
    "id": "125",
    "price": 106500,
    "twoForEnabled": false
  },
  {
    "id": "134",
    "price": 46370,
    "twoForEnabled": false
  },
  {
    "id": "127",
    "price": 47050,
    "twoForEnabled": false
  },
  {
    "id": "137",
    "price": 2215,
    "twoForEnabled": true
  },
  {
    "id": "39",
    "price": 960,
    "twoForEnabled": true
  },
  {
    "id": "41",
    "price": 960,
    "twoForEnabled": true
  },
  {
    "id": "155",
    "price": 900
  },
  {
    "id": "154",
    "price": 700
  },
  {
    "id": "337",
    "price": 1300
  },
  {
    "id": "339",
    "price": 1300
  },
  {
    "id": "157",
    "price": 1300
  },
  {
    "id": "338",
    "price": 1300
  },
  {
    "id": "156",
    "price": 1300
  },
  {
    "id": "349",
    "price": 1770
  },
  {
    "id": "348",
    "price": 1770
  },
  {
    "id": "166",
    "price": 9000
  },
  {
    "id": "168",
    "price": 9000
  },
  {
    "id": "167",
    "price": 9000
  },
  {
    "id": "170",
    "price": 1530
  },
  {
    "id": "169",
    "price": 1530
  },
  {
    "id": "165",
    "price": 2900
  },
  {
    "id": "171",
    "price": 1530
  },
  {
    "id": "244",
    "price": 6900
  },
  {
    "id": "256",
    "price": 15060
  },
  {
    "id": "255",
    "price": 13800
  },
  {
    "id": "254",
    "price": 23350
  },
  {
    "id": "257",
    "price": 3390
  },
  {
    "id": "246",
    "price": 83425
  },
  {
    "id": "245",
    "price": 6530
  },
  {
    "id": "251",
    "price": 7520
  },
  {
    "id": "248",
    "price": 62590
  },
  {
    "id": "247",
    "price": 48790
  },
  {
    "id": "258",
    "price": 3650
  },
  {
    "id": "250",
    "price": 20350
  },
  {
    "id": "249",
    "price": 20350
  },
  {
    "id": "253",
    "price": 14520
  },
  {
    "id": "252",
    "price": 7520
  },
  {
    "id": "173",
    "price": 9360
  },
  {
    "id": "180",
    "price": 13450
  },
  {
    "id": "177",
    "price": 10250
  },
  {
    "id": "176",
    "price": 23999
  },
  {
    "id": "179",
    "price": 6390
  },
  {
    "id": "178",
    "price": 7590
  },
  {
    "id": "341",
    "price": 5590
  },
  {
    "id": "340",
    "price": 4690
  },
  {
    "id": "174",
    "price": 7500
  },
  {
    "id": "172",
    "price": 11999
  },
  {
    "id": "175",
    "price": 4540
  },
  {
    "id": "411",
    "price": 14090
  },
  {
    "id": "413",
    "price": 6780
  },
  {
    "id": "181",
    "price": 8100
  },
  {
    "id": "421",
    "price": 11800
  },
  {
    "id": "292",
    "price": 11450
  },
  {
    "id": "283",
    "price": 58300
  },
  {
    "id": "284",
    "price": 58300
  },
  {
    "id": "296",
    "price": 4360
  },
  {
    "id": "297",
    "price": 4950
  },
  {
    "id": "295",
    "price": 3750
  },
  {
    "id": "298",
    "price": 24150
  },
  {
    "id": "299",
    "price": 19150
  },
  {
    "id": "293",
    "price": 4890
  },
  {
    "id": "294",
    "price": 3450
  },
  {
    "id": "288",
    "price": 30500
  },
  {
    "id": "287",
    "price": 41200
  },
  {
    "id": "285",
    "price": 79700
  },
  {
    "id": "286",
    "price": 56405
  },
  {
    "id": "260",
    "price": 28799
  },
  {
    "id": "259",
    "price": 27999
  },
  {
    "id": "269",
    "price": 11890
  },
  {
    "id": "270",
    "price": 10490
  },
  {
    "id": "282",
    "price": 7499
  },
  {
    "id": "2",
    "price": 7499
  },
  {
    "id": "279",
    "price": 6550
  },
  {
    "id": "263",
    "price": 25799
  },
  {
    "id": "264",
    "price": 25799
  },
  {
    "id": "268",
    "price": 16799
  },
  {
    "id": "267",
    "price": 16799
  },
  {
    "id": "262",
    "price": 16799
  },
  {
    "id": "265",
    "price": 30899
  },
  {
    "id": "261",
    "price": 17899
  },
  {
    "id": "266",
    "price": 19650
  },
  {
    "id": "280",
    "price": 5090
  },
  {
    "id": "281",
    "price": 4790
  },
  {
    "id": "276",
    "price": 8490
  },
  {
    "id": "277",
    "price": 8490
  },
  {
    "id": "273",
    "price": 8490
  },
  {
    "id": "272",
    "price": 6000
  },
  {
    "id": "278",
    "price": 8490
  },
  {
    "id": "271",
    "price": 8490
  },
  {
    "id": "274",
    "price": 8490
  },
  {
    "id": "275",
    "price": 8490
  },
  {
    "id": "237",
    "price": 5790
  },
  {
    "id": "491",
    "price": 4490
  },
  {
    "id": "236",
    "price": 4290
  },
  {
    "id": "238",
    "price": 8900
  },
  {
    "id": "241",
    "price": 45000
  },
  {
    "id": "239",
    "price": 45000
  },
  {
    "id": "240",
    "price": 65000
  },
  {
    "id": "242",
    "price": 45000
  },
  {
    "id": "243",
    "price": 45000
  },
  {
    "id": "310",
    "price": 10890
  },
  {
    "id": "309",
    "price": 10890
  },
  {
    "id": "307",
    "price": 10700
  },
  {
    "id": "308",
    "price": 9400
  },
  {
    "id": "304",
    "price": 8000
  },
  {
    "id": "301",
    "price": 24790
  },
  {
    "id": "311",
    "price": 2890
  },
  {
    "id": "303",
    "price": 46900
  },
  {
    "id": "302",
    "price": 46900
  },
  {
    "id": "305",
    "price": 7990
  },
  {
    "id": "306",
    "price": 7990
  },
  {
    "id": "316",
    "price": 9900
  },
  {
    "id": "317",
    "price": 9900
  },
  {
    "id": "313",
    "price": 9900
  },
  {
    "id": "314",
    "price": 9900
  },
  {
    "id": "315",
    "price": 9900
  },
  {
    "id": "312",
    "price": 9290
  },
  {
    "id": "161",
    "price": 3500
  },
  {
    "id": "160",
    "price": 3500
  },
  {
    "id": "159",
    "price": 3500
  },
  {
    "id": "387",
    "price": 5000
  },
  {
    "id": "383",
    "price": 6590
  },
  {
    "id": "386",
    "price": 5000
  },
  {
    "id": "385",
    "price": 11450
  },
  {
    "id": "381",
    "price": 10500
  },
  {
    "id": "388",
    "price": 26900
  },
  {
    "id": "382",
    "price": 5650
  },
  {
    "id": "384",
    "price": 15800
  },
  {
    "id": "184",
    "price": 7060
  },
  {
    "id": "183",
    "price": 1350
  },
  {
    "id": "182",
    "price": 5500
  },
  {
    "id": "185",
    "price": 4500
  },
  {
    "id": "186",
    "price": 4500
  },
  {
    "id": "187",
    "price": 4500
  },
  {
    "id": "158",
    "price": 16000
  },
  {
    "id": "375",
    "price": 16000
  },
  {
    "id": "377",
    "price": 16000
  },
  {
    "id": "379",
    "price": 16000
  },
  {
    "id": "415",
    "price": 4590
  },
  {
    "id": "162",
    "price": 10300
  },
  {
    "id": "490",
    "price": 6990
  },
  {
    "id": "409",
    "price": 6799
  },
  {
    "id": "5001",
    "price": 6500
  },
  {
    "id": "407",
    "price": 7750
  },
  {
    "id": "211",
    "price": 8690
  },
  {
    "id": "291",
    "price": 10399
  },
  {
    "id": "223",
    "price": 9999
  },
  {
    "id": "214",
    "price": 9550
  },
  {
    "id": "222",
    "price": 24300
  },
  {
    "id": "219",
    "price": 28800
  },
  {
    "id": "220",
    "price": 28800
  },
  {
    "id": "221",
    "price": 28800
  },
  {
    "id": "216",
    "price": 10600
  },
  {
    "id": "217",
    "price": 9650
  },
  {
    "id": "188",
    "price": 4990
  },
  {
    "id": "331",
    "price": 7500
  },
  {
    "id": "333",
    "price": 7500
  },
  {
    "id": "332",
    "price": 7500
  },
  {
    "id": "329",
    "price": 7500
  },
  {
    "id": "330",
    "price": 7500
  },
  {
    "id": "212",
    "price": 13400
  },
  {
    "id": "213",
    "price": 12000
  },
  {
    "id": "197",
    "price": 1890
  },
  {
    "id": "226",
    "price": 15300
  },
  {
    "id": "225",
    "price": 34600
  },
  {
    "id": "227",
    "price": 16350
  },
  {
    "id": "224",
    "price": 15600
  },
  {
    "id": "195",
    "price": 4700
  },
  {
    "id": "194",
    "price": 7550
  },
  {
    "id": "193",
    "price": 10450
  },
  {
    "id": "229",
    "price": 24500
  },
  {
    "id": "235",
    "price": 76200
  },
  {
    "id": "232",
    "price": 24500
  },
  {
    "id": "234",
    "price": 22150
  },
  {
    "id": "231",
    "price": 24500
  },
  {
    "id": "230",
    "price": 24500
  },
  {
    "id": "233",
    "price": 24500
  },
  {
    "id": "228",
    "price": 24500
  },
  {
    "id": "191",
    "price": 8000
  },
  {
    "id": "190",
    "price": 7000
  },
  {
    "id": "210",
    "price": 31400
  },
  {
    "id": "208",
    "price": 8690
  },
  {
    "id": "199",
    "price": 55200
  },
  {
    "id": "198",
    "price": 175999
  },
  {
    "id": "200",
    "price": 76590
  },
  {
    "id": "202",
    "price": 105000
  },
  {
    "id": "201",
    "price": 99500
  },
  {
    "id": "189",
    "price": 39600
  },
  {
    "id": "204",
    "price": 34800
  },
  {
    "id": "207",
    "price": 5700
  },
  {
    "id": "163",
    "price": 1500
  },
  {
    "id": "164",
    "price": 3000
  },
  {
    "id": "1001",
    "price": 22230
  },
  {
    "id": "1010",
    "price": 33080
  },
  {
    "id": "1004",
    "price": 26800
  },
  {
    "id": "1007",
    "price": 99100
  },
  {
    "id": "1008",
    "price": 38600
  },
  {
    "id": "9009",
    "price": 32120
  },
  {
    "id": "1006",
    "price": 17040
  },
  {
    "id": "45",
    "price": 13325
  },
  {
    "id": "96",
    "price": 1450
  },
  {
    "id": "99",
    "price": 2075
  },
  {
    "id": "100",
    "price": 1620
  },
  {
    "id": "46",
    "price": 2190
  },
  {
    "id": "355",
    "price": 2000
  },
  {
    "id": "354",
    "price": 2000
  },
  {
    "id": "33",
    "price": 3750
  },
  {
    "id": "34",
    "price": 3750
  },
  {
    "id": "31",
    "price": 3750
  },
  {
    "id": "32",
    "price": 3750
  },
  {
    "id": "30",
    "price": 3050
  },
  {
    "id": "35",
    "price": 800
  },
  {
    "id": "351",
    "price": 1300
  },
  {
    "id": "352",
    "price": 3990
  },
  {
    "id": "29",
    "price": 1200
  },
  {
    "id": "353",
    "price": 1000
  },
  {
    "id": "350",
    "price": 1255
  }
];
  const byId = new Map(changes.map(change => [String(change.id), change]));
  const keepDrinkBox = product => /skyy|fernet branca|speed xl/i.test(String(product.name || ''));
  const preserveDrinkException = product => {
    const name = String(product.name || '');
    if (/skyy/i.test(name)) return { ...product, price: 9900, boxQuantity: 12, boxUnitPrice: 8900, boxPrice: 106800 };
    if (/fernet branca/i.test(name)) return { ...product, price: 17000, boxQuantity: 12, boxUnitPrice: 16000, boxPrice: 192000 };
    if (/speed xl/i.test(name)) return { ...product, price: 3000, boxQuantity: 12, boxUnitPrice: 2000, boxPrice: 24000 };
    return product;
  };
  window.PRODUCTS = (window.PRODUCTS || [])
    .filter(product => String(product.id) !== '78' && !/bid[oó]n de vinagre.*5\s*l/i.test(String(product.name || '')))
    .map(product => {
      const change = byId.get(String(product.id));
      const updated = change ? { ...product, ...change } : { ...product };
      if (updated.cat === 'Bebidas' && !keepDrinkBox(updated)) {
        delete updated.boxPrice;
        delete updated.boxUnitPrice;
        delete updated.boxQuantity;
        delete updated.boxLabel;
        delete updated.boxProductId;
        delete updated.boxOnly;
      }
      return preserveDrinkException(updated);
    });
})();
