using AutoMapper;
using stockman.Models;
using stockman.Models.Dtos;

namespace stockman.AutoMapper;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<Users, UserDto>();
    }
}
