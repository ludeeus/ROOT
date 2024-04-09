import asyncio
import sys

async def do_stuff():

  def print_error_and_exit(err: str):
      print(f"::error::{err}")
      sys.exit(1)

  raise Exception("BOOM from exception")

  print_error_and_exit("BOOM!")


if __name__ == "__main__":
    asyncio.run(do_stuff())
