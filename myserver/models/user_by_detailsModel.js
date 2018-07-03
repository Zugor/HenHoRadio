module.exports={
    fields:{
        user_id             : "uuid",
        home_town_return    : "int",
        
        height              : "text",
        trust               : "float",
        review_point        : "float",
        distance            : "float",
        
        country             : "text",
        description         : "text",
        desc_wish           : "text",
        body_type           : "text",
        
        comment             : "text",
        majors              : "text",
        asset_overview      : "text",
        home_town           : "text",
        address             : "text",
        monthly_income      : 'text',
        phones              : 
                            {   type    :   "map",
                                typeDef :  "<text,text>"},
        emails              : 
                            {   type    :   "map",
                                typeDef :  "<text,text>"},
        facebook            : 
                            {   type    :   "map",
                                typeDef :  "<text,text>"},
        hhr_goal            : 
                            {   type    :   "map",
                                typeDef :  "<text,text>"},
        relationship_status : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        
        general_personality : 
                            {   type    :   "set",
                                typeDef :   "<frozen<map<text,text>>>"   },
        glasses             : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        tattoo                : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        plastic_surgery     : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        clothing            : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        
        best_part           : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        smoking             : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        sport               : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        travel              : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        
        jealousy            :  
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        jobs                : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        graduation          : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        
        house               : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        cars                : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        
        religion            : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        
        live_with           : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        friends             : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        pets                : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
        intro1              : 
                            {   type    :   "set",
                                typeDef :   "<text>"   },
        intro2              : 
                            {   type    :   "set",
                                typeDef :   "<text>"   }, 
        intro3              : 
                            {   type    :   "set",
                                typeDef :   "<text>"   },
        video               : 
                            {   type    :   "set",
                                typeDef :   "<text>"   },
        appearance          : 
                            {   type    :   "map",
                                typeDef :   "<text,text>"   },
    },
    key:[["user_id"]]   
}
    
    

    
