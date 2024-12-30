using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.DTOs;
using Api.Entities;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
   
    public class UsersController :BaseApiController
    {
        private readonly DataContext _context;

        // public UsersController(DataContext context)
        // {
        //     _context = context;
        // }
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            
        }
        
        [HttpGet]
        [AllowAnonymous]
        // public ActionResult<List<AppUser>> 
        // public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers(){
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers(){
            return await _context.Users.ToListAsync();
            // var users = await _userRepository.GetUsersAsync();
            // var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
            
            // return Ok(usersToReturn);
             
        }

        //if you want to add your own query ask chatGpt how to do?
        
        [HttpGet("{username}")]
        // public async Task<ActionResult<MemberDto>> GetUser(string username){
        public async Task<ActionResult<AppUser>> GetUser(int id){
            return await _context.Users.FindAsync(id);
            // var users = await _userRepository.GetUserByUsernameAsync(username);
            // var usersToReturn = _mapper.Map<MemberDto>(users);

            // return Ok(usersToReturn);
            
        }

        

    }
}