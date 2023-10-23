import { DriveEta, Event, Group, ShoppingCart } from "@mui/icons-material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArchiveIcon from "@mui/icons-material/Archive";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import BackupIcon from "@mui/icons-material/Backup";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useEffect } from "react";
import { getStats } from "@store/stats/statsSlice";
import { setPageName } from "@store/toolsbar/toolsbarSlice";
import Search from "@components/Home/Search/Search";
import SearchResults from "@components/Home/SearchResults/SearchResults";
import Loading from "@components/Common/Loading/Loading";
function Home() {
  const dispatch = useDispatch();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const { allStats, loading } = useSelector((state) => state.stats);

  // Arrange Data
  const statsData =
    allStats &&
    Object.keys(allStats).map((key) => {
      let result;
      switch (key) {
        case "users":
          result = {
            id: Math.floor(Math.random() * 100000) + 1,
            title: "المستخدمين",
            count: allStats[key],
            icon: <Group sx={{ color: "#063e81" }} />,
            bgColor: "#063e8130",
            txtColor: "#063e81",
            link: "users",
          };
          break;
        case "departments":
          result = {
            id: Math.floor(Math.random() * 100000) + 1,
            title: "الاقسام",
            count: allStats[key],
            icon: <BorderAllIcon sx={{ color: "#c12121" }} />,
            bgColor: "#c1212130",
            txtColor: "#c12121",
            link: "departments",
          };
          break;
        case "folders":
          result = {
            id: Math.floor(Math.random() * 100000) + 1,
            title: "المجلدات",
            count: allStats[key],
            icon: <FolderOpenIcon sx={{ color: "#009328" }} />,
            bgColor: "#00932830",
            txtColor: "#009328",
            link: "folders",
          };
          break;
        case "files":
          result = {
            id: Math.floor(Math.random() * 100000) + 1,
            title: "الملفات",
            count: allStats[key],
            icon: <AttachFileIcon sx={{ color: "#00bcd4" }} />,
            bgColor: "#00bcd430",
            txtColor: "#00bcd4",
            link: "folders",
          };
          break;
        case "totalSize":
          result = {
            id: Math.floor(Math.random() * 100000) + 1,
            title: "حجم الكلي",
            count: allStats[key],
            icon: <BackupIcon sx={{ color: "#795548" }} />,
            bgColor: "#79554830",
            txtColor: "#d37202",
          };
          break;
        case "archives":
          result = {
            id: Math.floor(Math.random() * 100000) + 1,
            title: "الارشيف",
            count: allStats[key],
            icon: <ArchiveIcon sx={{ color: "#d37202" }} />,
            bgColor: "#d3720230",
            txtColor: "#d37202",
          };
          break;
      }
      return result;
    });
  // Fetch Data
  useEffect(() => {
    dispatch(getStats());
    dispatch(setPageName("home"));
  }, [dispatch]);
  return loading ? (
    <Loading />
  ) : (
    <>
      <Grid container spacing={3}>
        {statsData?.map((item, i) => (
          <Grid key={item.id} item lg={i <= 3 ? 3 : 6} md={6} xs={12}>
            <Card>
              <CardContent>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}>
                  <Typography variant="h6" fontSize={16} color={item.txtColor}>
                    {item.title}
                  </Typography>
                  <Box
                    padding={1}
                    className="flex-center"
                    sx={{ background: item.bgColor, borderRadius: 3 }}>
                    {item.icon}
                  </Box>
                </Box>
                <Typography
                  variant="h4"
                  fontSize={32}
                  fontWeight={700}
                  sx={{ my: 2 }}>
                  {item.count}
                </Typography>
                <Typography
                  variant="h4"
                  fontSize={13}
                  color="primary"
                  textAlign={"left"}>
                  {item.link && <Link to={item.link}>عرض</Link>}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="flex-center">
        <Search />
      </div>
      <Stack>
        <SearchResults />
      </Stack>
    </>
  );
}

export default Home;
