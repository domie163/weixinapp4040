const menu = {
    list() {
        return [
    {
        "backMenu":[
        ],
        "frontMenu":[
        ],
        "hasBackLogin":"是",
        "hasBackRegister":"否",
        "hasFrontLogin":"否",
        "hasFrontRegister":"否",
        "roleName":"管理员",
        "tableName":"users"
    },
    {
        "backMenu":[
			{
                "child":[
                    {
                        "buttons":[
                            "查看"
                        ],
                        "menu":"购物车",
                        "menuJump":"列表",
                        "tableName":"cart"
                    }
                ],
                "menu":"购物车"
            }
			,
			{
                "child":[
                    {
                        "buttons":[
                            "查看"                        ],
                        "menu":"菜品信息",
                        "menuJump":"列表",
                        "tableName":"goods"
                    }
                ],
                "menu":"菜品信息"
            }
            ,
            {
                "child":[
                    {
                        "buttons":[
                            "查看",
                            "删除"
                        ],
                        "menu":"我的菜品评价信息",
                        "menuJump":"列表",
                        "tableName":"goodsCommentback"
                    }
                ],
                "menu":"我的菜品评价信息"
            }
			,
			{
			    "child":[
			        {
			            "buttons":[
			                "查看",
			                "删除"
			            ],
			            "menu":"我的菜品订单信息",
			            "menuJump":"列表",
			            "tableName":"goodsOrder"
			        }
			    ],
			    "menu":"我的菜品订单信息"
			}
            ,
            {
                "child":[
                    {
                        "buttons":[
                            "查看"
                        ],
                        "menu":"新闻信息管理",
                        "menuJump":"列表",
                        "tableName":"news"
                    }
                ],
                "menu":"新闻信息"
            }
        ],
        "frontMenu":[
        ],
        "hasBackLogin":"是",
        "hasBackRegister":"否",
        "hasFrontLogin":"是",
        "hasFrontRegister":"是",
        "roleName":"用户",
        "tableName":"yonghu"
    }
]

	}
}
export default menu;
