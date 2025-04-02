using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using stockman.Hubs;
using stockman.Models;
using stockman.Models.Dtos;
using stockman.Repositories.Interfaces;
using stockman.ViewModels;

namespace stockman.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallController : ControllerBase
    {
        private readonly ICallRepository _callRepository;
        private readonly IUsersRepository _userRepository;
        private readonly ISectorRepository _sectorRepository;
        private readonly IHubContext<CallHub> _hubContext;
        public CallController(
            ICallRepository callRepository, 
            IUsersRepository userRepository, 
            ISectorRepository sectorRepository,
            IHubContext<CallHub> hubContext
        )
        {
            _callRepository = callRepository;
            _userRepository = userRepository;
            _sectorRepository = sectorRepository;
            _hubContext = hubContext;
        }

        [HttpPost]
        [Authorize(policy: "user")]
        public async Task<ActionResult<Call>> Create(CreateCallViewModel request)
        {
            _ = await _userRepository.GetByIdAsync(request.UserId);
            _ = await _sectorRepository.GetByIdAsync(request.SectorId);

            Call call = request.CreateCall();
            var result = await _callRepository.CreateAsync(call);
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", request.Title);
            return StatusCode(201, result);
        }

        [HttpGet]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult<IEnumerable<CallDto>>> GetAll()
        {
            return Ok(await _callRepository.GetAllAsync());
        }

        [HttpGet("{callId:long}")]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult<Call>> GetById(long callId)
        {
            if (callId <= 0)
            {
                return BadRequest("O id para pesquisa deve ser maior que zero");
            }

            return Ok(await _callRepository.GetByIdAsync(callId));
        }

        //[HttpDelete("{calledId:int}")]
        //public async Task<IActionResult> Delete(int calledId)
        //{
        //    if (calledId <= 0)
        //    {
        //        return BadRequest("The id for search called must be greater than zero");
        //    }

        //    Called called = await _callRepository.GetByIdAsync(calledId);
        //    await _callRepository.DeleteAsync(called);
        //    return NoContent();
        //}

        [HttpGet("user/{userId:long}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CallDto>>> GetByUserId(long userId)
        {
            if (userId <= 0)
            {
                return BadRequest("O id para pesquisa deve ser maior que zero");
            }

            return Ok(await _callRepository.GetByUserIdAsync(userId));
        }

        [HttpGet("resolved")]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult<IEnumerable<CallDto>>> GetResolvedCalls()
        {
            return Ok(await _callRepository.GetResolvedCalls());
        }

        [HttpGet("sector/{sectorId:int}")]
        [Authorize(policy: "moderador")]
        public async Task<ActionResult<IEnumerable<Call>>> GetBysectorId(int sectorId)
        {
            if (sectorId <= 0)
            {
                return BadRequest("O id para pesquisa deve ser maior que zero");
            }

            return Ok(await _callRepository.GetBySectorIdAsync(sectorId));
        }

        [HttpPut("resolved/{callId:int}/{userId:int}")]
        [Authorize(policy: "moderador")]
        public async Task<IActionResult> Resolved(int callId, int userId)
        {
            var call = await _callRepository.GetByIdAsync(callId);
            var user = await _userRepository.GetByIdAsync(userId);

            call.AttendedById = user.Id;
            call.AttendedTime = DateTime.UtcNow;
            call.Resolved = true;

            await _callRepository.UpdateAsync(call);
            return NoContent();
        }

    }
}

