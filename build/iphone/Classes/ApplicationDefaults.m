/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"AUDr7ojM7WibwlElCopQ7pVteWYbGePq"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"ONeYZ6vXRQy2Ztlzwbzun1ZQAU0BHTox"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"bWDbT9PwFYZCenSXg0oRQheNrI9yjJE0"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"47yB6YZMPk1ibq80Ji8J7vJEHiwwqk9u"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"kEL0utCwiDTwTuZpXPnpEkiKHFD50Xnk"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"b08TauihCEUjrGNNRScbyV6lmmRgC6sQ"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end