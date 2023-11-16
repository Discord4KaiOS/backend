class DOMApplication extends EventTarget {
	manifest: Manifest;
	manifestURL: string;
	origin: string;
	installOrigin: string;
	installTime: number;
	receipts: object[] | null;
	removable: boolean;
	enabled: boolean;

	launch(...args): void;

	/**
	 * @deprecated UNKNOWN METHOD
	 */
	updateManifest: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	progress: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	installState: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	lastUpdateCheck: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	updateTime: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	allowedAutoDownload: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	downloadAvailable: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	downloading: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	readyToApplyDownload: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	downloadSize: unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	downloadError: unknown;

	/**
	 * @deprecated UNKNOWN METHOD
	 */
	addReceipt(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	checkForUpdate(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	removeReceipt(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	replaceReceipt(): unknown;

	/**
	 * @deprecated UNKNOWN METHOD
	 */
	download(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	cancelDownload(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	clearBrowserData(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	clearStorage(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	connect(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	getConnections(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	export(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	getLocalizedValue(): unknown;

	onprogress?: Function | null;
	ondownloadsuccess?: Function | null;
	ondownloaderror?: Function | null;
	ondownloadavailable?: Function | null;
	ondownloadapplied?: Function | null;
}

class DOMApplicationsRegistry {
	getSelf(): DOMRequest<DOMApplication>;
	mgmt: DOMApplicationsManager;

	/**
	 * @deprecated UNKNOWN METHOD
	 */
	install(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	installPackage(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	getInstalled(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	checkInstalled(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	getAdditionalLanguages(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	getLocalizationResource(): unknown;
}

class DOMApplicationsManager extends EventTarget {
	getAll(): DOMRequest<DOMApplication[]>;
	/**
	 * thanks to [Affe Nulle](https://gitlab.com/affenull2345/kaios-metro-launcher/-/blob/07f0168ec3ff8fe5d38ac97bad2d8a375c9e33a4/src/backend/index.js)
	 */
	getIcon(app: DOMApplication, size: number): Promise<Blob>;
	/**
	 * AppBuster by [luxferre](https://gitlab.com/suborg/appbuster/-/blob/35f2b28d2c6c2105f62edbda46607c70a81671c2/js/app.js#L30)
	 */
	setEnabled(appRef: DOMApplication, newAppStatus: boolean): void;

	/**
	 * thanks to luxferre, [LibWallace](https://gitlab.com/suborg/wallace-toolbox/-/blob/6a460a396f799fdafefb1045edbd9eabb81cc644/js/libwallace.js#L472)
	 */
	import(package: Blob | File): Promise<void>;

	oninstall?: Function | null;
	onuninstall?: Function | null;
	onupdate?: Function | null;
	onenabledstatechange?: Function | null;

	/**
	 * @deprecated UNKNOWN METHOD
	 */
	applyDownload(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	uninstall(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	extractManifest(): unknown;
	/**
	 * @deprecated UNKNOWN METHOD
	 */
	getActivities(): unknown;
}

type AccessDescription = Partial<{
	description: string;
	access: "readonly" | "readwrite" | "readcreate" | "createonly";
}>;

type AccessDescriptionRecord = Record<string, AccessDescription>;

type ManifestOptional = Partial<{
	short_name: string;
	bgs: Record<string, string>;
	launch_path: string;
	theme_color: string;
	origin: string;
	permissions: AccessDescriptionRecord;
	type: "privileged" | "certified" | "web";
	fullscreen: "true" | "false";
	"datastores-owned": AccessDescriptionRecord;
	"datastores-access": AccessDescriptionRecord;
	messages: Array<Record<string, string>>;
	redirects: { from: string; to: string }[];
	role: string;
	activities: Record<
		string,
		Partial<{
			filters: {
				type: string[];
			};
			href: string;
			disposition: "window" | "inline";
			returnValue: boolean;
		}>
	>;
	precompile: string[];
	orientation: ("portrait" | "landscape" | "portrait-primary" | "landscape-primary" | "portrait-secondary" | "landscape-secondary")[];
	csp: string;
	entry_points: Record<
		string,
		{
			name: string;
			launch_path: string;
			locales?: Record<string, { name: string; description: string }>;
			theme_color?: string;
		}
	>;
}>;

interface Manifest extends ManifestOptional {
	name: string;
	version: string;
	description: string;
	icons: Record<string, string>;
	developer: { name: string; url?: string };
	locales: Record<string, { name: string; description: string }>;
	default_locale: string;
	subtitle: string;
	categories: ("social" | "games" | "utilities" | "life style" | "entertainment" | "health" | "sports" | "book/reference")[];
}

interface MoveOrCopyOptions {
	keepBoth: boolean;
	targetStorage: DeviceStorage;
}

interface MozActivityOptions {
	name: string;
	data?: any;
}

interface MozActivityRequestHandler {
	readonly source: MozActivityOptions;
	postResult(data: any): void;
	postError(error: Error | string): void;
}

type respectTimezoneOptions = "ignoreTimezone" | "honorTimezone";

interface mozAlarm {
	id: number;
	date: Date;
	respectTimezone: respectTimezoneOptions;
	data?: any;
}

interface MozAlarmsManager {
	add(date: Date, respectTimezone: respectTimezoneOptions, data?: any): DOMRequest<mozAlarm>;
	remove(id: number): void;
	getAll(): DOMRequest<mozAlarm[]>;
}

function mozSetMessageHandler(type: "activity", handler: (request: MozActivityRequestHandler) => void): void;
function mozSetMessageHandler(type: "alarm", handler: (request: mozAlarm) => void): void;
function mozSetMessageHandler(type: string, handler: (request: unknown) => void): void;

function mozHasPendingMessage(type: Parameters<typeof mozSetMessageHandler>[0]): boolean;

type SettingsCallback = (this: SettingsManager, ev: MozSettingsEvent) => void;

type ValidDeviceStorages = "apps" | "music" | "pictures" | "videos" | "sdcard";

/**
 * @deprecated this isn't something actually exposed to KaiOS
 */
namespace Internals {
	type _Manifest = Manifest;
	type _DOMApplication = DOMApplication;
	type _DOMApplicationsRegistry = DOMApplicationsRegistry;
	type _DOMApplicationsManager = DOMApplicationsManager;
	type _DOMRequest<T> = DOMRequest<T>;
}

// todo classes:
/*
MozMobileConnectionArray
MozMobileConnection
MozMobileConnectionInfo
MozMobileNetworkInfo
MozMobileMessageManager
MozMobileCellInfo
*/

declare global {
	/**
	 * @deprecated this isn't something actually exposed to KaiOS
	 */
	namespace KaiOS_internals {
		export type Manifest = Internals._Manifest;
		export type DOMApplication = Internals._DOMApplication;
		export type DOMApplicationsRegistry = Internals._DOMApplicationsRegistry;
		export type DOMApplicationsManager = Internals._DOMApplicationsManager;
		export type DOMRequest<T> = Internals._DOMRequest<T>;
	}

	class SettingsLock {
		get<T extends string, R>(settingName: T): DOMRequest<Record<T, R>>;
		set(settings: Record<string, any>): DOMRequest<void>;
	}

	class MozSettingsEvent<T = any> extends Event {
		settingName: string;
		settingValue: T;
	}

	class SettingsManager extends EventTarget {
		onsettingchange?: SettingsCallback | null;
		createLock(): SettingsLock;
		addObserver(settingName: string, callback: SettingsCallback): void;
		removeObserver(settingName: string, callback: SettingsCallback): void;
	}

	interface Navigator {
		volumeManager: VolumeManager;
		getDeviceStorage(deviceStorage: ValidDeviceStorages): DeviceStorage;
		getDeviceStorages(deviceStorage: ValidDeviceStorages): DeviceStorage[];

		/**
		 * the function is basically just:
		 * ```JS
		 * function (name, type) {
		 * 	const storages = navigator.getDeviceStorages(type);
		 * 	return storages.find(storage => name === storage.storageName) || null;
		 * }
		 * ```
		 * @param name `DeviceStorage.storageName`
		 * @param type `navigator.getDeviceStorages(type)`
		 */
		getDeviceStorageByNameAndType(name: string, type: ValidDeviceStorages): DeviceStorage | null;
		mozApps: DOMApplicationsRegistry;
		mozAlarms: MozAlarmsManager;
		mozSetMessageHandler: typeof mozSetMessageHandler;
		mozHasPendingMessage: typeof mozHasPendingMessage;
		mozSettings: SettingsManager;
	}

	interface VolumeManager {
		requestShow(): void;
		requestUp(): void;
		requestDown(): void;
	}

	interface DOMRequest<T> extends EventTarget {
		readonly error?: Error;
		readonly result: T;
		onsuccess: () => void;
		onerror: () => void;
		readonly then: Promise<T>["then"];
		readonly readyState: "done" | "pending";
	}

	interface DOMCursor<T> extends EventTarget {
		readonly error?: Error;
		readonly result: T;
		onsuccess: () => void;
		onerror: () => void;
		readonly done: boolean;
		readonly readyState: "done" | "pending";
		readonly continue(): void;
	}

	interface HTMLMediaElement {
		mozAudioChannelType: "normal" | "content";
	}

	class MozActivity<T = any> extends DOMRequest<T> {
		constructor(options: MozActivityOptions): MozActivity;
	}

	class Directory {
		/**
		 * name of the current folder
		 */
		name: string;

		/**
		 * the filepath of the folder relative to the root
		 */
		path: string;

		/**
		 * creates a file to a filepath (creates folders if necessary), the created file will be an empty Blob
		 * @param filepath relative file path
		 */
		createFile(filepath: string): Promise<boolean>;
		/**
		 * creates a folder to a filepath (creates folders if necessary)
		 * @param filepath relative file path
		 */
		createDirectory(filepath: string): Promise<boolean>;

		/**
		 * get the file, creates a folder if it doesn't exist
		 * @param filepath relative file path
		 */
		get(filepath: string): Promise<File>;

		/**
		 * removes a file/folder, throws Exeception if the folder has content
		 * @param filepath relative file path
		 * @returns true if the file/folder was removed, false if it didn't exist
		 */
		remove(filepath: string): Promise<boolean>;
		/**
		 * removes a file/folder
		 * @param filepath relative file path
		 * @returns true if the file/folder was removed, false if it didn't exist
		 */
		removeDeep(filepath: string): Promise<boolean>;

		/**
		 * Renames a file or folder, relative file path
		 * @param filepath relative file path
		 * @param newName new name of the file or folder
		 */
		renameTo(filepath: string, newName: string): Promise<boolean>;
		getFilesAndDirectories(): Promise<Array<File | Directory>>;
		getFiles(): Promise<File[]>;

		/**
		 * copies a file to a destination
		 * warning: did not test method for edge cases (e.g. copy to same folder, wrong directory)
		 * @param filepath relative file path
		 * @param relativeDirectoryPath relative folder path in relation to the root of the provided targetStorage
		 * @param options required options
		 */
		copyTo(filepath: string, relativeDirectoryPath: string, options: MoveOrCopyOptions): Promise<boolean>;
		/**
		 * moves a file to a destination
		 * warning: did not test method for edge cases (e.g. move to same folder or wrong directory)
		 * @param filepath relative file path
		 * @param relativeDirectoryPath relative folder path in relation to the root of the provided targetStorage
		 * @param options required options
		 */
		moveTo(filepath: string, relativeDirectoryPath: string, options: MoveOrCopyOptions): Promise<boolean>;
	}

	interface DeviceStorage {
		storageName: string;
		get(filePath: string): DOMRequest<File>;
		addNamed(file: File | Blob, filePath: string): DOMRequest<File>;
		appendNamed(file: File | Blob, filePath: string): DOMRequest<File>;
		delete(filePath: string): DOMRequest<void>;
		enumerate(path?: string, options?: { since: Date }): DOMCursor<File>;
		getRoot(): Promise<Directory>;
		freeSpace(): DOMRequest<number>;
		usedSpace(): DOMRequest<number>;
	}

	class XMLHttpRequest {
		constructor(options?: { mozSystem?: boolean; mozAnon?: boolean }): XMLHttpRequest;
	}
}

export {};
