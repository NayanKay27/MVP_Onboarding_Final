using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace OnBoarding_Project.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }

        [BindProperty]
        [Required(ErrorMessage = "Product name is required.")]
        public string Name { get; set; }

        [BindProperty]
        [DataType(DataType.Currency)]
        [Required(ErrorMessage = "Price is required.")]
        public decimal? Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
