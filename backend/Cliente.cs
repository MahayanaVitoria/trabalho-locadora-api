// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using System.Text.RegularExpressions;
// using System.Linq;

// namespace Locadora
// {
   
//    class Validate
//    {
        
//         public Validate()
//         {

//         }
//         int[] multiplier_one = new int[9]{10, 9, 8, 7, 6, 5, 4, 3, 2};
//         int[] multiplier_two = new int[10]{11, 10, 9, 8, 7, 6, 5, 4, 3, 2};

//         // public static bool isNumeric(string s)
//         // {
//         //     return int.TryParse(s, out int n);
//         // }

//         public static bool isNumeric(string s)
//         {
//         foreach (char c in s)
//         {
//             if (!(c >= '0' && c <= '9')) {
//                 return false;
//             }
//         }
 
//         return true;
//         }

//         public int setDigit(int resto)
//         {
//             if (resto >= 2)
//             {
//                 return 11 - resto;
//             }
//             return 0;
//         }

//         public bool validateCPF(string cpf)
//         {
//             var isCPF = false;          

//             cpf  = cpf.Replace(".", "").Replace("-", "").Replace(" ", "");
//             if (cpf.Length == 11 && isNumeric(cpf)) 
//             {
//                 string aux = cpf.Substring(0, 9);
//                 var soma = 0;
//                 for (int i = 0; i < aux.Length; i++)
//                 {
//                     soma += multiplier_one[i] * int.Parse(aux[i].ToString());
//                 }

//                 // Inserindo Primerio Digito
//                 aux = aux + Convert.ToString(setDigit(soma % 11));
//                 soma = 0;

//                 for (int i = 0; i < aux.Length; i++)
//                 {
//                     soma += multiplier_two[i] * int.Parse(aux[i].ToString());
//                 }

//                 // Inserindo Segundo Digito
//                 aux = aux + Convert.ToString(setDigit(soma % 11));

//                 if (aux == cpf)
//                 {
//                     isCPF = true;
//                 }
//             }
//             return isCPF;
//         }


//    }


//     // class Cliente
//     // {
//     //     long id;
//     //     string nomeCompleto;
//     //     string cpf;
//     //     string telefone;
//     //     DateTime dataNascimento;

//     //     public Cliente(string n, string c, string t, string d)
//     //     {
//     //         id = DateTime.Now.Ticks;
//     //         nomeCompleto = n;
//     //         string cpf = c;
//     //     }


//     // }

// }