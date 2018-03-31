/*
 * Copyright (c) 2014-2016 Alibaba Group. All rights reserved.
 * License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
package com.catt.hypnus.service.deviceMgr;

import com.aliyuncs.AcsResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.RpcAcsRequest;
import com.catt.hypnus.aliyun.iot.deviceshadow.client.IotClient;
import com.catt.hypnus.aliyun.iot.util.logger;

public class BaseDeviceShadowTool {

    private static DefaultAcsClient client;

    static {
        client = IotClient.getClient();
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    public static AcsResponse executeTest(RpcAcsRequest request) {
        AcsResponse response = null;
        try {
            response = client.getAcsResponse(request);
        } catch (Exception e) {
            logger.print("执行失败：e:" + e.getMessage());
        }
        return response;
    }
}