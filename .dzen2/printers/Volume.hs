module Volume (main, getVol, isMuted) where
import Data.Maybe (fromMaybe)
import System.Environment (getEnv)
import System.Process(readProcess)
import PercentBar (percentBar)
import Utils (regexGroups, readProc)

mutedColors = ["yellow", "red"] ++ otherColors
unmutedColors = ["black", "green"] ++ otherColors
otherColors = "blue":(repeat "orange")

main = do
  home <- getEnv "HOME"
  vol <- getVol "speaker"
  mute <- isMuted "speaker"
  let colors = if mute then mutedColors else unmutedColors
  putStr $ percentBar vol colors 5

getVol :: String -> IO Int
getVol = fmap fst . getStatus

isMuted :: String -> IO Bool
isMuted = fmap snd . getStatus

getStatus :: String -> IO (Int, Bool)
getStatus dev = do
  status <- readProc ["pulse-vol", dev]
  let groups = regexGroups "(\\d+) \\((muted|unmuted|unknown)\\)" status
  let [vol, mute] = fromMaybe ["0", "unknown"] groups
  return (read vol, mute == "muted")


