/* ************************************************************************
 * ADOBE CONFIDENTIAL
 * ___________________
 *
 * Copyright 2024 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 **************************************************************************/

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { About } from "../views/About";
import { GenerateImage } from "../views/GenerateImage";
import { EditImage } from "../views/EditImage";

const AppRouter = () => {
    return(
        <Routes>
            {/* <Route path="*" element={<ErrorView />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/generate" element={<GenerateImage />} />
            <Route path="/edit/:id" element={<EditImage />} />
        </Routes>
    );
};

export default AppRouter