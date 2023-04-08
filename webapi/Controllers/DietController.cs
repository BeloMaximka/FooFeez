﻿using com.spoonacular;
using Microsoft.AspNetCore.Mvc;
using webapi.Model;

namespace webapi.Controllers
{
    [ApiController]
    [Route("api/diet")]
    public class DietController : ControllerBase
    {
        private readonly IRecipesApi api;

        public DietController(IRecipesApi api)
        {
            this.api = api;
        }

        [HttpGet(Name = "GetMenuByCalories")]
        public Menu GetMenuByCalories([FromQuery] int maxCalories)
        {
            return new();
        }
    }
}
