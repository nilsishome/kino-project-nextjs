import { Button } from "@mui/material";

const SwiperButtons: React.FC = () => { 
    return (
<>

            {/* Left button */}
            <Button
              className="swiper-button-prev"
              sx={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "#f1ddc5",
                color: "#c43c3a",
                border: "2px solid black",
                // "&:hover": {
                //   backgroundColor: "#c43c3a",
                // },
                // color: "#f1ddc5"
              }}
            >
              ⬅
            </Button>
            
            {/* Right button */}
            <Button
              className="swiper-button-next"
              sx={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 10,
                backgroundColor: "#f1ddc5",
                color: "#c43c3a",
                border: "2px solid black",
              }}
            >
              ➡
            </Button>
</>
    );
};

export default SwiperButtons;