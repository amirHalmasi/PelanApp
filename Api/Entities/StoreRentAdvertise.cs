using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class StoreRentAdvertise
    {
        // rent specific columns
         public int Id { get; set; }
        public string AdvertiseCode { get; set; }    
        public string Username { get; set; }  
        public string DepositPrice { get; set; }    
        public string RentPrice { get; set; }    
        public string BranchesControlStatus { get; set; }    
        public string StoreRentType { get; set; }  

    }
}