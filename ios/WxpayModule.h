//
//  WxpayModule.h
//  hello
//
//  Created by Umeinfo on 2018/3/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "WXApiObject.h"
#import "WXApi.h"

@interface WxpayModule : NSObject <RCTBridgeModule, WXApiDelegate>

@end
