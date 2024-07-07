import { Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from "dayjs";
import React from "react";
import { useWatchDog, WatchDogContextType } from "../../context/watchDogContext";

interface DateCalendarProps {
    date: Dayjs | null
}

export const DateCalendar:React.FC<DateCalendarProps> = (props) => {
    const {
        setCurrentDate:handleSetCurrentDate
    }:WatchDogContextType = useWatchDog();
    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Date"
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            disabled: true,
                        },
                    }}
                    defaultValue={props.date}
                    onChange={(date) => handleSetCurrentDate(date)}
                    
                />
            </LocalizationProvider>
        </Box>
    )
}