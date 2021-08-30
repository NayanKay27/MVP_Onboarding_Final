using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnBoarding_Project.Models.ViewModels
{
    public class SalesViewModel
    {
        public string ProductName { get; set; }

        public string CustomerName { get; set; }

        public string  StoreName { get; set; }

        public DateTime DateSold { get; set; }
    }
}
