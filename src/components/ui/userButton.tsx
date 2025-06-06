"use client";

import React, { useState } from "react";
import {
  Avatar,
  Backdrop,
  CircularProgress,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import { Logout, AccountBox, Settings } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (status === "loading") {
    return (
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const avatarFallback =
    session?.user?.firstName?.charAt(0).toUpperCase() || "?";

  return (
    <nav>
      {session && (
        <>
          <Button
            color="inherit"
            onClick={handleMenuOpen}
            startIcon={
              <Avatar
                src={session.user?.image || undefined}
                alt={session.user?.firstName}
                sx={{ width: 30, height: 30 }}
              >
                {avatarFallback}
              </Avatar>
            }
            sx={{ textTransform: "none", px: { xs: 1, md: 2 }, py: 0 }}
          >
            {session.user?.firstName}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              "& .MuiMenu-paper": {
                color: "#333333",
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[3],
                mt: 1,
                minWidth: 200,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                router.push("");
                handleMenuClose();
              }}
            >
              <AccountBox fontSize="small" sx={{ mr: 0.5 }} />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("");
                handleMenuClose();
              }}
            >
              <Settings fontSize="small" sx={{ mr: 0.5 }} />
              Settings
            </MenuItem>
            <MenuItem
              onClick={() => {
                signOut();
                handleMenuClose();
              }}
            >
              <Logout fontSize="small" sx={{ mr: 0.5 }} />
              Logout
            </MenuItem>
          </Menu>
        </>
      )}
    </nav>
  );
};

export default UserButton;
