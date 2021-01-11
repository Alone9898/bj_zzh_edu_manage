// import nav1 from "@/assets/nav1.svg";
// import nav2 from "@/assets/nav2.svg";
// import nav3 from "@/assets/nav3.svg";
// import nav4 from "@/assets/nav4.svg";
// import nav5 from "@/assets/nav5.svg";
// import nav6 from "@/assets/nav6.svg";
// import nav7 from "@/assets/nav7.svg";

export default [{
    module_id: 3,
    module_name: "医生统计",
    icon:"el-icon-user",
    index: "5",
    list: [
        {
        module_id: 31,
        module_name: "医生信息",
        path: "/DoctorStatistics/informationList"
    },
        {
            module_id: 32,
            module_name: "活动统计",
            path: "/DoctorStatistics/statisticsList"
        },
    ]
},
    // {
    //     module_id: 3,
    //     module_name: "处方统计",
    //     icon:"el-icon-s-platform",
    //     index: "4",
    //     list: [{
    //         module_id: 33,
    //         module_name: "处方列表",
    //         path: "/recipeStatistics/recipeList"
    //     },
    //     ]
    // },
     {
        module_id: 3,
        module_name: "订单统计",
        icon:"el-icon-document",
        index: "3",
        list: [{
            module_id: 31,
            module_name: "订单列表",
            path: "/ordersStatistics/ordersList"
        },

        ]
    },
    // {
    //     module_id: 3,
    //     module_name: "费用统计",
    //     icon:"el-icon-money",
    //     index: "2",
    //     list: [{
    //         module_id: 31,
    //         module_name: "统计列表",
    //         path: "/costStatistics/constList"
    //     },
    //
    //     ]
    // },

]